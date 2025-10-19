import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRoute from './routes/auth.routs.js';
import msgRoute from './routes/messages.routs.js';
import path from 'path';
import { connectDB } from './db/db.js';
import cookieParser from "cookie-parser";
import { arcProtection } from './middleware/arcjet.miidelware.js';
const app=express();

//combining front and backend
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoute);
app.use('/api/msg',msgRoute);

app.get('/api/home',arcProtection,(req,res)=>{
    res.json({hello:"world"});
});

//combining frontend and backend
if(process.env.NODE_ENV=="production"){

    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    });
}

app.listen(process.env.PORT || 3000,()=>{

    console.log(`app listening on port:http://localhost:${process.env.PORT || 3000}`);
    const connect=connectDB();
    console.log(connect);
});
