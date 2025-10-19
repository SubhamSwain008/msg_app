import aj from "../utils/arcjet.utils.js";

import { isSpoofedBot } from "@arcjet/inspect";


export const arcProtection=async(req ,res,next)=>{

    try{
        const descison=await aj.protect(req);
        if(descison.isDenied()){
            return res.status(429).json({"message":"spam / bot request "});
        }
        if(descison.results.some(isSpoofedBot)) return res.status(429).json({"message":"spoof bot "});

        next();
    }catch(e){

        res.status(400).json({"message":e});
    }
}