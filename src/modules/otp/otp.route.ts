import { Router } from "express";
import { otpController } from "./otp.controller";


const router = Router()

router.post("/send-otp",otpController.sendOtp)

router.post("/verify-otp",otpController.verifyOtp)

const otpRouter = router
export default otpRouter