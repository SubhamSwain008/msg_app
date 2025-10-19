import {v2} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

 v2.config({ 
        cloud_name:process.env.CLOUDINARY_NAME , 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRECT // Click 'View API Keys' above to copy your API secret
    });

export const upload_on_cloud=async(localFilePath)=>{
try{
    if(!localFilePath) return -1;

    const res=await v2.uploader.upload(localFilePath,{
        resource_type:"auto"
    });
    console.log("uploaded");
    return res;

}catch(e){
    console.log(e);
    fs.unlinkSync(localFilePath);//if upload failes file is removed;
    return e;

}

}