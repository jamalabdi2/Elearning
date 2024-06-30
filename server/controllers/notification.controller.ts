import { NextFunction,Request,Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import notificationModel from "../models/notification.model";
import cron from 'node-cron';


//only for admin
export const getNotifications = CatchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const notifications = await notificationModel.find().sort({createAt: -1});
        res.status(200).json({
            success: true,
            notifications,
        })
    } catch (error:any) {
        return next (new ErrorHandler(error.message, 500))
    }
})

//update notification status

export const updateNotification = CatchAsyncError( async (req:Request, res:Response, next:NextFunction) => {
    try {
        const notificationId = req.params.id;
        const notification = await notificationModel.findById(notificationId);

        if(!notification){
            return next (new ErrorHandler("Notification not found",404));
        }else{
            notification.status ? notification.status = 'read' : notification?.status;
        }
        await notification.save();
        const notifications = await notificationModel.find().sort({
            createdAt: -1
        })

        res.status(201).json({
            success: true,
            notifications
        })

    } catch (error:any) {
        return next (new ErrorHandler(error.message, 500));
    }
})

//delete notification 
/*
* => seconds
* => minute
* => hour
* => day of month
* => month
* => day of week
*/
//00:00:00 => midnight

cron.schedule("0 0 0 * * * ", async() =>{
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await notificationModel.deleteMany({status:'read', createdAt: {$lt: thirtyDaysAgo}});
    console.log('Deleted read notifications');
})


