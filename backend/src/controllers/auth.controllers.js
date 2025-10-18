import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/jwt.utils.js";
import { sendEmail } from "../utils/email.utils.js";

export const signup= async(req,res)=>{
    const {fullname,email,password}=req.body;

    try{
        if(!fullname||!email||!password){
            res.status(400).json({message:"fullname / email / password is missing"});
        }
        //email check
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            res.status(400).json({message:"please enter a valid email"});
        }
        const user=await User.findOne({email});
        if(user) return res.status(400).json({message:"email already taken"});
        
        const salt=await bcrypt.genSalt(10)
        
        const hasedPassword=await bcrypt.hash(password,salt);
        const newUser= new User({
            fullname:fullname,
            email:email,
            password:hasedPassword,
        });
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            const eRes=await sendEmail(newUser.email,"first welcome","you are terminated");

            res.status(201).json({
                fullname:newUser.fullname,
                email:newUser.email,
                eRes:eRes,
            })
        }else{
            res.status(400).json({message:"invalid user data"});
        }

    
    }catch(e){
        res.status(500).json("error in signup controller");
    }

    
}

export const login=async(req,res)=>{
    const {email,password}=req.body;

    try{
       const user=await User.findOne({email});
       if(!user) res.status(400).json({"message":"invalid credentials"});
       const isPasswordCorrect= await bcrypt.compare(password,user.password);
       if(!isPasswordCorrect) res.status(400).json({"message":"invalid credentails"});

       generateToken(user._id,res);

       res.status(200).json({
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        profilePic:user.profilePic,
       });



    }catch(e){
            res.status(400).json({"message":"login failed due to internal error. ",e})
    }
}

export const logout=async(req,res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({"message":"user logged out"});
}