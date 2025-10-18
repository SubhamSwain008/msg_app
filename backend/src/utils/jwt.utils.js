import jwt from 'jsonwebtoken';


export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRECT,{
        expiresIn:"1d",
    });

    res.cookie("jwt",token,{
        maxAge:1*24*60*60*1000,
        httpOnly:true,//prevents xss attacks
        sameSite:"strict",//CSRF attacks
        secure:process.env==="devlopemnt"?false:true,
    });

    return token;
}