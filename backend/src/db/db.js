import mongoose from 'mongoose';



export const connectDB=async()=>{

    try{
        await mongoose.connect(process.env.MONGO_DB);
        console.log("connected to db");
    }catch(e){
        console.log(e);
    }
}