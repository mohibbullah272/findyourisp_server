import { Router } from "express";
import { notificationService } from "./notification.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../users/user.interface";


const router = Router()


router.get("/all",checkAuth(UserRole.ADMIN),notificationService.getAllNotification)

router.get("/",checkAuth(...Object.values(UserRole)),notificationService.getUserNotification )

router.post("/create",checkAuth(UserRole.ADMIN),notificationService.createNotification)

router.delete("/delete/:id",checkAuth(UserRole.ADMIN),notificationService.deleteNotification)


export const notificationRoute = router