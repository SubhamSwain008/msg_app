import jwt from 'jsonwebtoken';
import User  from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

export const SocketAUthenticationMiddleware = async (socket, next) => {
    try{
        const token =socket.handshake.headers.cookie
        ?.split("; ")
        .find((row)=>row.startsWith("jwt="))
        ?.split("=")[1];

        if(!token){
            return next(new Error("Authentication error"));
        }
        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRECT);
        // token payload sometimes uses `userId` (when issued by our jwt.utils) or `id`.
        if(!decoded || (!decoded.userId && !decoded.id)){
            return next (new Error("Authentication error"));
        }
        // determine user id from token payload
        const userId = decoded.userId || decoded.id;
        //fetch user from db
        const user=await User.findById(userId).select("-password");
        if(!user){
            return next (new Error("Authentication error"));
        }
        //attach user to socket object
        socket.user=user;
        socket.userId=user._id.toString();
        console.log("Socket Authenticated User:", socket.userId);
        next();

    }catch(err){
        console.error("Socket Authentication Error:", err);
        next(new Error("Authentication error"));
    }
}