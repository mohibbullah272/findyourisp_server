import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";

import { successResponse } from "../../utility/apiResponse";
import { notificationController } from "./notification.service";



const createNotification = catchAsync(async(req:Request,res:Response)=>{
const result = await notificationController.createNotification(req.body)

return successResponse(res,
    result,
    "notification created successfully",
    201
)
})

const getAllNotification= catchAsync(async(req:Request,res:Response)=>{

const result = await notificationController.getAllNotification()

return successResponse(res,
    result,
    "notification found successfully",
    200
)
})


const deleteNotification= catchAsync(async(req:Request,res:Response)=>{

const result = await notificationController.deleteNotification(req.params.id)

return successResponse(res,
    result,
    "notification deleted successfully",
    201
)
})

const getUserNotification= catchAsync(async(req:Request,res:Response)=>{

const userData = req.user

const result = await notificationController.getUserNotification(userData.email)

return successResponse(res,
    result,
    "notification found successfully",
    201
)
})



export const notificationService ={
    createNotification,
    getAllNotification,
    deleteNotification,
    getUserNotification
}
