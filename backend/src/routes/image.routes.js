import { Router } from "express";
import {
    uploadAndScanImage,
    getUserImages,
    getImageById,
    deleteImage,
    getDiseaseStats
} from "../controllers/image.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Apply authentication middleware to all routes
router.use(verifyJWT);

// Upload and scan image for disease detection
router.post(
    "/upload",
    upload.single("image"),
    uploadAndScanImage
);

// Get all images for the authenticated user
router.get("/user-images", getUserImages);

// Get specific image by ID
router.get("/:imageId", getImageById);

// Delete image
router.delete("/:imageId", deleteImage);

// Get disease statistics
router.get("/stats/diseases", getDiseaseStats);

export default router; 