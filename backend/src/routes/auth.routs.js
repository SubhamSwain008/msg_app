import express from 'express';
import { signup, login, logout, updateProfile, authCheck } from '../controllers/auth.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { upload } from '../utils/multer.utils.js';
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute,upload.single("image"), updateProfile);

router.get("/auth-check",protectRoute,authCheck)

export default router;