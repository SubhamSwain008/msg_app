import express from 'express';
import { getAllPeople, getChatPartners, getMessagesByUserId,sendMessages } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router=express.Router();



router.get("/all-people",protectRoute,getAllPeople);
router.get("/chats",protectRoute,getChatPartners);
router.get("/:id",protectRoute,getMessagesByUserId);

router.post("/send/:id",protectRoute,sendMessages);

export default router;