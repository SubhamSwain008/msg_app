import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/jwt.utils.js";
import { sendEmail } from "../utils/email.utils.js";
import { upload_on_cloud } from "../utils/clodinary.utils.js";
import fs from 'fs';

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "fullname / email / password is missing" });
    }

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "please enter a valid email" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "email already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      const eRes = await sendEmail(newUser.email, "first welcome", "you are terminated");

      return res.status(201).json({
        fullname: newUser.fullname,
        email: newUser.email,
        eRes,
      });
    } else {
      return res.status(400).json({ message: "invalid user data" });
    }
  } catch (e) {
    console.error("Signup error:", e);
    return res.status(500).json({ message: "error in signup controller" });
  }
};


export const login=async(req,res)=>{
    

    try{
      const {email,password}=req.body;
       const user=await User.findOne({email});
       if(!user) return res.status(400).json({"message":"invalid credentials"});
       const isPasswordCorrect= await bcrypt.compare(password,user.password);
       if(!isPasswordCorrect) return res.status(400).json({"message":"invalid credentails"});

       generateToken(user._id,res);

       return res.status(200).json({
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        profilePic:user.profilePic,
       });



    }catch(e){
          return  res.status(400).json({"message":"login failed due to internal error. ",e})
    }
}

export const logout=async(req,res)=>{
    console.log("recived");
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({"message":"user logged out"});
}

export const updateProfile=async(req,res)=>{
         try{
            if(!req.file) return res.status(400).json({"message":"please upload the image"});

            const localFilePath=req.file.path;
            const cloudRes=await upload_on_cloud(localFilePath);

            if(fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
            const userId=req.user._id;
            const updated=await User.findByIdAndUpdate(userId,{profilePic:cloudRes.secure_url},
                {new:true});

            res.status(200).json({"message":updated, "cloud res":cloudRes});


         }catch(e){
            res.status(400).json({"message":"internal error in image upload"})
         }
   
}

export const authCheck=async(req,res)=>{
    
    res.status(200).json({"message":true,fullname:req.user.fullname,_id:req.user._id,profilePic:req.user.profilePic});
}