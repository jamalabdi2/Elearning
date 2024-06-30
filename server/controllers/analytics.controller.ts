import { Request,Response,NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import orderModel from "../models/order.model";




export const getUserAnalytics = CatchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await generateLast12MonthsData(userModel);
        res.status(200).json({
            success: true,
            users
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

export const getCoursesAnalytics = CatchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const courses = await generateLast12MonthsData(courseModel);
        res.status(200).json({
            success: true,
            courses
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

export const getOrderAnalytics = CatchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const orders = await generateLast12MonthsData(orderModel);
        res.status(200).json({
            success: true,
            orders
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

/*
async function getAnalyticsData(model: any) {
    return await generateLast12MonthsData(model);
}

async function handleAnalyticsRequest(req: Request, res: Response, next: NextFunction, model: any) {
    try {
        const data = await getAnalyticsData(model);
        res.status(200).json({
            success: true,
            data
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}

export const getUserAnalytics = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    await handleAnalyticsRequest(req, res, next, userModel);
});

export const getCoursesAnalytics = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    await handleAnalyticsRequest(req, res, next, courseModel);
});

export const getOrderAnalytics = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    await handleAnalyticsRequest(req, res, next, orderModel);
});

*/