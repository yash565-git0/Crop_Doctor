import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

// We now export a function to set up the configuration on demand.
export const setupCloudinary = () => {
    cloudinary.config({
        cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
        api_key    : process.env.CLOUDINARY_API_KEY,
        api_secret : process.env.CLOUDINARY_API_SECRET
    });
};

export const uploadOnCloudinary = async (localfilepath) => {
    try {
        if(!localfilepath) return null;
       const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type : "auto"
        });
        return response;

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};