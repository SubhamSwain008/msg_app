import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

   
export const sendEmail=async(to,subject,message)=>{
    try{
    const resend = new Resend(process.env.RE_SEND_API);
   await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: to,
  subject: subject||'well come to our world class messaging app',
  html: `<p>hello dear a msg for you : \n <strong>${message}</strong></p>`||'<p>start chatting with your friends and familes now .<strong>....</strong>!</p>'
});

console.log("email sent.");
return "email sent sucessful";
    }
    catch(e)
{   
    console.log(e);
    return "failed to sent email."
}   
}


