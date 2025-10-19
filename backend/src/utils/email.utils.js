import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (to, subject, message) => {
  try {
    // Configure transporter with Gmail and app password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // your App Password
      },
    });

    // Compose the email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: subject || 'Welcome to our world-class messaging app',
      html: `
        <p>Hello dear, a message for you:</p>
        <p><strong>${message || 'Start chatting with your friends and family now!'}</strong></p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log('✅ Email sent.');
    return 'email sent successful';
  } catch (e) {
    console.error('❌ Failed to send email:', e);
    return 'failed to send email.';
  }
};
