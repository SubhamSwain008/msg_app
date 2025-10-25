import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRoute from './routes/auth.routs.js';
import msgRoute from './routes/messages.routs.js';
import path from 'path';
import { connectDB } from './db/db.js';
import cookieParser from "cookie-parser";
import { arcProtection } from './middleware/arcjet.miidelware.js';
import {app,httpServer} from "./utils/socket.io.utils.js";

//combining front and backend
const __dirname=path.resolve();
const corsOptions = {
    origin: process.env.CORS, // Allow only requests from this origin
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use('/api/auth',authRoute);
app.use('/api/msg',msgRoute);

app.get('/api/home',(req,res)=>{
    res.json({hello:"world"});
});

//combining frontend and backend
if(process.env.NODE_ENV!="devlopemnt"){

    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    });
}

httpServer.listen(process.env.PORT ,()=>{

    console.log(`app listening on port:http://localhost:${process.env.PORT}`);
    const connect=connectDB();
    console.log(connect);
});
