import jwt from 'jsonwebtoken';


export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRECT,{
        expiresIn:"1d",
    });

    res.cookie("jwt", token, {
    maxAge: 24*60*60*1000, // 1 day
    httpOnly: true,
    secure: true, // required for cross-site over HTTPS
    sameSite: "none", // allow cross-site
});


    return token;
}