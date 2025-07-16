import { Router } from "express";
import {
    uploadAndScanImage,
    getUserImages,
    getDiseaseStats
} from "../controllers/image.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Demo user ID for bypassing authentication
const DEMO_USER_ID = "507f1f77bcf86cd799439011"; // MongoDB ObjectId format

// Middleware to inject demo user
const injectDemoUser = (req, res, next) => {
    req.user = {
        _id: DEMO_USER_ID,
        username: "demo",
        fullName: "Demo User"
    };
    next();
};

// Apply demo user middleware to all routes
router.use(injectDemoUser);

// Upload and scan image for disease detection (no auth required)
router.post(
    "/upload",
    upload.single("image"),
    uploadAndScanImage
);

// Get all images for demo user
router.get("/user-images", getUserImages);

// Get disease statistics for demo user
router.get("/stats/diseases", getDiseaseStats);

export default router; 