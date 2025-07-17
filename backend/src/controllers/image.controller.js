import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Image } from "../models/image.model.js";
import { setupCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

function fileToGenerativePart(filePath, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
            mimeType,
        },
    };
}

const uploadAndScanImage = asyncHandler(async (req, res) => {
    setupCloudinary();
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // **THE FIX:** Use the correct model name without the suffix
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { title, description } = req.body;

    if (!title || !description) throw new ApiError(400, "Title and description are required");
    if (!req.file) throw new ApiError(400, "Image file is required");

    const localPath = req.file.path;

    try {
        const imageParts = [fileToGenerativePart(localPath, req.file.mimetype)];

        console.log("[SCAN] Uploading image to Cloudinary...");
        const cloudinaryResponse = await uploadOnCloudinary(localPath);
        if (!cloudinaryResponse || !cloudinaryResponse.url) throw new ApiError(500, "Error uploading image to Cloudinary");
        console.log("[SCAN] Cloudinary upload complete.");

        console.log("[SCAN] Calling Gemini AI for prediction...");
        const prompt = `Analyze the provided image of a plant leaf. Format the response as a single, clean JSON object with keys: "disease", "confidence", "description", "symptoms", "treatment", "prevention".`;
        
        const result = await model.generateContent([prompt, ...imageParts]);
        const responseText = await result.response.text();
        const cleanedJsonString = responseText.replace(/```json|```/g, '').trim();
        const prediction = JSON.parse(cleanedJsonString);
        console.log("[SCAN] Gemini AI prediction result:", prediction);

        const image = await Image.create({
            imageFile: cloudinaryResponse.url,
            disease: prediction.disease,
            owner: req.user._id,
            title,
            description,
            confidence: prediction.confidence,
        });
        const savedImage = await Image.findById(image._id).populate("owner", "username fullName");

        return res.status(201).json(new ApiResponse(201, { image: savedImage, prediction }, "Image analyzed successfully"));

    } catch (err) {
        console.error("[SCAN][ERROR]", err);
        throw new ApiError(500, "Failed to analyze the image. " + err.message);
    } finally {
        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath);
            console.log("[SCAN] Local file cleaned up.");
        }
    }
});

// ... (The rest of your functions remain the same)
const getUserImages = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const options = { page: parseInt(page), limit: parseInt(limit) };
    const images = await Image.aggregate([
        { $match: { owner: req.user._id } },
        { $lookup: { from: "users", localField: "owner", foreignField: "_id", as: "owner" } },
        { $addFields: { owner: { $first: "$owner" } } },
        { $sort: { createdAt: -1 } }
    ]);
    return res.status(200).json(new ApiResponse(200, { images, currentPage: options.page, totalPages: Math.ceil(images.length / options.limit) }, "Images fetched successfully"));
});

const getImageById = asyncHandler(async (req, res) => {
    const { imageId } = req.params;
    const image = await Image.findById(imageId).populate("owner", "username fullName avatar");
    if (!image) { throw new ApiError(404, "Image not found"); }
    if (image.owner._id.toString() !== req.user._id.toString()) { throw new ApiError(403, "Access denied"); }
    return res.status(200).json(new ApiResponse(200, image, "Image fetched successfully"));
});

const deleteImage = asyncHandler(async (req, res) => {
    const { imageId } = req.params;
    const image = await Image.findById(imageId);
    if (!image) { throw new ApiError(404, "Image not found"); }
    if (image.owner.toString() !== req.user._id.toString()) { throw new ApiError(403, "Access denied"); }
    await Image.findByIdAndDelete(imageId);
    return res.status(200).json(new ApiResponse(200, {}, "Image deleted successfully"));
});

const getDiseaseStats = asyncHandler(async (req, res) => {
    const stats = await Image.aggregate([
        { $match: { owner: req.user._id } },
        { $group: { _id: "$disease", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);
    const totalImages = await Image.countDocuments({ owner: req.user._id });
    return res.status(200).json(new ApiResponse(200, { stats, totalImages }, "Statistics fetched successfully"));
});

export {
    uploadAndScanImage,
    getUserImages,
    getImageById,
    deleteImage,
    getDiseaseStats
};