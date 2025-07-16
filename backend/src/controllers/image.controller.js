import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Image } from "../models/image.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import fs from "fs";
import path from "path";

// Upload and scan image for disease detection
const uploadAndScanImage = asyncHandler(async (req, res) => {
    console.log("[SCAN] Received upload request");
    const { title, description } = req.body;
    
    if (!title || !description) {
        console.log("[SCAN] Missing title or description");
        throw new ApiError(400, "Title and description are required");
    }

    if (!req.file) {
        console.log("[SCAN] No image file provided");
        throw new ApiError(400, "Image file is required");
    }

    try {
        console.log("[SCAN] Uploading image to Cloudinary...");
        const imageUrl = await uploadOnCloudinary(req.file.path);
        console.log("[SCAN] Cloudinary upload complete:", imageUrl);
        
        if (!imageUrl) {
            console.log("[SCAN] Cloudinary upload failed");
            throw new ApiError(500, "Error uploading image to cloudinary");
        }

        console.log("[SCAN] Calling Gemini AI for prediction...");
        const prediction = await predictDiseaseFromImage(req.file.path);
        console.log("[SCAN] Gemini AI prediction result:", prediction);

        // Use prediction data directly from Gemini (no need for separate diseaseInfo call)
        const diseaseInfo = {
            description: prediction.description,
            symptoms: prediction.symptoms,
            treatment: prediction.treatment,
            prevention: prediction.prevention
        };

        console.log("[SCAN] Saving image and prediction to database...");
        const image = await Image.create({
            imageFile: imageUrl.url,
            disease: prediction.disease,
            owner: req.user._id,
            title,
            description,
            confidence: prediction.confidence
        });
        console.log("[SCAN] Image and prediction saved to DB:", image._id);

        // Clean up local file
        fs.unlinkSync(req.file.path);
        console.log("[SCAN] Local file cleaned up");

        const savedImage = await Image.findById(image._id).populate("owner", "username fullName avatar");

        return res.status(201).json(
            new ApiResponse(201, {
                image: savedImage,
                prediction: {
                    disease: prediction.disease,
                    confidence: prediction.confidence,
                    description: diseaseInfo.description,
                    symptoms: diseaseInfo.symptoms,
                    treatment: diseaseInfo.treatment,
                    prevention: diseaseInfo.prevention,
                    probabilities: prediction.probabilities
                }
            }, "Image uploaded and analyzed successfully")
        );
    } catch (err) {
        console.log("[SCAN][ERROR] Error during scan:", err);
        throw err;
    }
});

// Get all images for a user
const getUserImages = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    };

    const images = await Image.aggregate([
        {
            $match: {
                owner: req.user._id
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(200, {
            images,
            currentPage: options.page,
            totalPages: Math.ceil(images.length / options.limit)
        }, "Images fetched successfully")
    );
});

// Get image by ID
const getImageById = asyncHandler(async (req, res) => {
    const { imageId } = req.params;

    const image = await Image.findById(imageId).populate("owner", "username fullName avatar");

    if (!image) {
        throw new ApiError(404, "Image not found");
    }

    // Check if user owns the image or is admin
    if (image.owner._id.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Access denied");
    }

    return res.status(200).json(
        new ApiResponse(200, image, "Image fetched successfully")
    );
});

// Delete image
const deleteImage = asyncHandler(async (req, res) => {
    const { imageId } = req.params;

    const image = await Image.findById(imageId);

    if (!image) {
        throw new ApiError(404, "Image not found");
    }

    if (image.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Access denied");
    }

    await Image.findByIdAndDelete(imageId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Image deleted successfully")
    );
});

// Get disease statistics for user
const getDiseaseStats = asyncHandler(async (req, res) => {
    const stats = await Image.aggregate([
        {
            $match: {
                owner: req.user._id
            }
        },
        {
            $group: {
                _id: "$disease",
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                count: -1
            }
        }
    ]);

    const totalImages = await Image.countDocuments({ owner: req.user._id });

    return res.status(200).json(
        new ApiResponse(200, {
            stats,
            totalImages
        }, "Statistics fetched successfully")
    );
});

export {
    uploadAndScanImage,
    getUserImages,
    getImageById,
    deleteImage,
    getDiseaseStats
}; 