import nodemailer from "nodemailer";
import { generateOTP } from "../../utility/generateOtp";
import { OTP } from "./otp.model";
import bcrypt from "bcryptjs";
import AppError from "../../middlewares/appError";

export const sendOTPEmail = async (email: string, otp: string) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    await transporter.sendMail({
      from: `"Find Your ISP" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your One-Time Password (OTP)",
      html: `
        <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#ffffff;padding:24px;border-radius:8px;border:1px solid #eaeaea;">
          
          <h2 style="color:#1f2937;text-align:center;margin-bottom:8px;">
            Find Your ISP
          </h2>
  
          <p style="font-size:14px;color:#374151;text-align:center;margin-bottom:24px;">
            Secure Login Verification
          </p>
  
          <p style="font-size:16px;color:#111827;">
            Hello,
          </p>
  
          <p style="font-size:15px;color:#374151;">
            Use the following One-Time Password (OTP) to complete your verification.
          </p>
  
          <div style="text-align:center;margin:24px 0;">
            <span style="
              display:inline-block;
              font-size:28px;
              letter-spacing:6px;
              font-weight:bold;
              color:#2563eb;
              background:#f1f5f9;
              padding:12px 24px;
              border-radius:6px;
            ">
              ${otp}
            </span>
          </div>
  
          <p style="font-size:14px;color:#374151;">
            This OTP will expire in <strong>5 minutes</strong>.  
            Please do not share this code with anyone.
          </p>
  
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
  
          <p style="font-size:12px;color:#6b7280;text-align:center;">
            If you did not request this, please ignore this email.
          </p>
  
          <p style="font-size:12px;color:#6b7280;text-align:center;">
            © ${new Date().getFullYear()} Find Your ISP. All rights reserved.
          </p>
        </div>
      `,
    });
  };
  


const sendOtp = async (email: string) => {
    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);
  
    await OTP.deleteMany({ email }); 
  
    await OTP.create({
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
  
    await sendOTPEmail(email, otp);
  
    return true;
  };
  
  const verifyOtp = async (email: string, otp: string) => {
    const otpDoc = await OTP.findOne({ email });
  
    if (!otpDoc) {
      throw new AppError("OTP not found", 400);
    }
  
    if (otpDoc.expiresAt < new Date()) {
      throw new AppError("OTP expired", 400);
    }
  
    const isMatch = await bcrypt.compare(otp, otpDoc.otp);
    if (!isMatch) {
      throw new AppError("Invalid OTP", 400);
    }
  
    otpDoc.verified = true;
    await otpDoc.save();
  
    return true;
  };
  


  export const otpService = {
    sendOtp,
    verifyOtp
  }