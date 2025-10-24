import express from 'express';
import { getAllPeople, getChatPartners, getMessagesByUserId,sendMessages } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { upload } from '../utils/multer.utils.js';
const router=express.Router();



router.get("/all-people",protectRoute,getAllPeople);
router.get("/chats",protectRoute,getChatPartners);
router.get("/:id",protectRoute,getMessagesByUserId);

router.post("/send/:id",protectRoute,sendMessages);
// router.post("/sendImage/:id",protectRoute,upload.single("image"),sendImages);
export default router;