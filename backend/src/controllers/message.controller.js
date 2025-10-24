import Message from '../models/Message.js'
import User from '../models/User.js'
import {v2 as cloudinary} from 'cloudinary'

export const getAllPeople=async(req ,res)=>{
    try{
       
        const loggedInUserId=req.user._id;
        if(!loggedInUserId) return res.status(400).json({"message":"user not found "})
        const fillterUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(fillterUsers);


    }catch(e){
        console.error("❌ getAllPeople error:", e);

        res.status(400).json({"message":"failed to fetch users due to internal error",e});
    }

}

export const getMessagesByUserId=async(req,res)=>{
    try{
        const myId=req.user._id;
        const {id:userToChatId}=req.params;

        //fecth msg by me to u or you to me
        const message = await Message.find({
            $or:[
                {senderId:myId,receverId:userToChatId},
                {senderId:userToChatId,receverId:myId}
            ]
        });
        res.status(200).json(message);

    }catch(e){
      console.log(e);
      res.status(500).json({"message":"internal error ",e})
    }
}

export const sendMessages=async(req,res)=>{
   try{ const {text,image}=req.body;
    const {id:receverId}=req.params;
    const senderId=req.user._id;

    let imageUrl;

    if(image){
        const uploadResponse=await cloudinary.uploader.upload(image);
        imageUrl=uploadResponse.secure_url;
    }
    const newMessage=new Message({
        senderId,
        receverId,
        text,
        image:imageUrl,
    });
    await newMessage.save();

    res.status(201).json({"message ":"message sent sucessfully",newMessage});
}
catch(e){
    console.log(e);
    return res.status(400).json({"message":"failed to send message",e})
}

}
// export const sendImages=async(req,res)=>{
//     try{
//             if(!req.file) return res.status(400).json({"message":"please send the image"});

//             const localFilePath=req.file.path;
//             const cloudRes=await upload_on_cloud(localFilePath);

//             if(fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
//             const userId=req.user._id;
//             const updated=await User.findByIdAndUpdate(userId,{profilePic:cloudRes.secure_url},
//                 {new:true});

//             res.status(200).json({"message":updated, "cloud res":cloudRes});


//          }catch(e){
//             res.status(400).json({"message":"internal error in image upload"})
//          }
// }
export const getChatPartners=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id.toString();

        const userMessages=await Message.find({
            $or:[{senderId:loggedInUserId},{receverId:loggedInUserId}]
        });
        const chatPatnersIds=[...new Set(userMessages.map((msg)=>
            msg.senderId.toString() ===loggedInUserId? msg.receverId.toString():msg.senderId.toString()
        ))
    ]   
    // console.log(loggedInUserId,chatPatnersIds);
    const chatPatners=await User.find({_id:{$in:chatPatnersIds}}).select("-password");
    res.status(200).json({chatPatners});
    }
    catch(e){
        console.log(e);
        res.status(400).json({"message":"failed to get chats due ton internal errors",e});
    }
}