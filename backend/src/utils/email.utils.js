import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (to, subject, message) => {
  try {
    // Transporter configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  // your Gmail
        pass: process.env.EMAIL_PASS,  // App Password, no spaces
      },
      secure: true,  // use TLS
      logger: true,  // logs info for debugging
      debug: true,   // shows communication with Gmail server
    });

    // Compose email
    const mailOptions = {
      from:process.env.EMAIL_USER,
      to,
      subject: subject || 'Welcome to Chat App!',
      html: `
        <p>Hello,</p>
        <p><strong>${message || 'Start chatting with your friends now!'}</strong></p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return 'Email sent successfully';

  } catch (err) {
    console.error('❌ Failed to send email:', err.response || err);
    return `Failed to send email: ${err.message}`;
  }
};
