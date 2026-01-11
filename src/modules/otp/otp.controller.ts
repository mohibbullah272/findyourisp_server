import catchAsync from "../../utility/catchAsync";
import { otpService } from "./otp.service";


const sendOtp = catchAsync(async (req, res) => {
    await otpService.sendOtp(req.body.email);
  
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  });
  
  const verifyOtp = catchAsync(async (req, res) => {
    await otpService.verifyOtp(req.body.email, req.body.otp);
  
    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  });


  export const otpController ={
    sendOtp,
    verifyOtp
  }