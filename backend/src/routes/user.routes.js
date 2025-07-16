import { Router } from "express";
import cors from "cors"
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Public routes
// router.use(
//   cors({
//     credentials: true,
//     origin: 'http://localhost:5173'
//   })
// )
router.post("/register", registerUser);

router.post("/login", loginUser);

// Protected routes
router.get("/me", verifyJWT, getCurrentUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", verifyJWT, changeCurrentPassword);

export default router; 