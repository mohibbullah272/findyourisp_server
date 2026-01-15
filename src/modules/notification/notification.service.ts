import { INotify } from "./notification.interface";
import Notification from "./notification.model";



const createNotification = async(payload:INotify)=>{
    const storeNotification = await Notification.create(payload)
    return storeNotification
}

const deleteNotification = async(id:any)=>{
    const notification = await Notification.deleteOne({_id:id})
    return notification

}

const getAllNotification = async()=>{
    const result = await Notification.find()
    return result
}

const getUserNotification = async(email:any)=>{

    const userNotifications = await Notification.find({
        emails: { $elemMatch: { $eq: email } }
      });

      return userNotifications

}

export const notificationController = {
    createNotification,
    deleteNotification,
    getAllNotification,
    getUserNotification
}