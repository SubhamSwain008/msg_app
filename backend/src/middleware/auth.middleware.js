import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

export const protectRoute = async (req, res,next) => {
    try {

        const token = req.cookies.jwt;
        if (!token) return res.status(400).json({ "message": "unauhtorized user" });

        const decoded = jwt.verify(token,process.env.JWT_SECRECT);


        if (!decoded) return res.status(400).json({ "message": "invalid token" });

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(400).json({ "message": "user not found" });

        req.user = user;
        next();

    } catch (e) {
        return res.status(400).json({ "message ": "internal error in profile update ", e });
    }
}