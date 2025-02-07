import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2 style="color: #333;">Your OTP Code</h2>
                    <p style="font-size: 16px; color: #555;">Use the code below to verify your account:</p>
                    <h1 style="font-size: 28px; color: #1a73e8; background: #f1f3f4; padding: 10px; display: inline-block; border-radius: 5px;">
                        ${text}
                    </h1>
                    <p style="font-size: 14px; color: #777;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
                </div>
            `,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

export default sendMail;
