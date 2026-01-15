import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { authService } from "./auth.service";
import { successResponse } from "../../utility/apiResponse";



const createAccount = catchAsync(async(req:Request,res:Response)=>{

    const user = await authService.createAccount(req.body)

    res.cookie("accessToken",user.token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })


      return successResponse(res,{
        user:user.userSafeData
      },
      "account created successfully",
      201
      )
})


const login = catchAsync(async(req:Request,res:Response)=>{
const user = await authService.login(req.body)

res.cookie("accessToken",user.token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
})

res.status(201).json({
    success: true,
    message: "login  successful",
    user: {
      id: user.userSafeData.userId,
      email: user.userSafeData.email,
    },
  });


})

export const authController = {
    createAccount,
    login
}