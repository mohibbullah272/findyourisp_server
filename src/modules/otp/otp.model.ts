import { model,  Schema } from "mongoose";


const otpSchema = new Schema({
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String, // hashed
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  });
  

  export const OTP =  model("OTP",otpSchema)