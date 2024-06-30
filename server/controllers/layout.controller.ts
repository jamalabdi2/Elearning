import { Request,Response,NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import cloudinary from 'cloudinary';
import layoutModel from "../models/layout.model";
import { RecordWithTtl } from "dns";

//create layout

export const createLayout = CatchAsyncError( async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {type} = req.body;
        if(!type){
            return next (new ErrorHandler("Type is required",400));
        }

        const isTypeExists = await layoutModel.findOne({type});
        if(isTypeExists){
            return next (new ErrorHandler(`${type} already exists`,400))
        }

        if(type === "Banner"){
            const {image,title,subTitle} = req.body;

            const response = await cloudinary.v2.uploader.upload(image,{
                folder: "Layout",
            })

            const banner = {
                image: {
                    public_id: response.public_id,
                    url: response.secure_url,
                },
                title,
                subTitle,
            }
            layoutModel.create(banner);


        }
        if(type === "FAQ"){
            const {faq} = req.body;

            const faqItems = faq.map((item: any) => ({
                question: item.question,
                answer: item.answer,
            }));

            const layout = new layoutModel({
                type,
                faq: faqItems, 
            });

            await layout.save(); 
         

        }
        if(type === "Categories"){
            const {categories} = req.body;
            const categoryItems = categories.map((item: any) => ({
                title: item.title
            }))
            const layout = new layoutModel({
                type,
                categories: categoryItems, 
            });
            await layout.save()
        } 

        res.status(201).json({
            success: true,
            message: "layout created sucessfully"
        })
    } catch (error:any) {
        return next ( new ErrorHandler(error.message,500))
    }
})

// Edit layout
export const editLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;
        if (!type) {
            return next(new ErrorHandler("Type is required", 400));
        }

        if (type === "Banner") {
            const { image, title, subTitle } = req.body;
            const bannerData: any = await layoutModel.findOne({ type: "Banner" });

            if (bannerData) {
                await cloudinary.v2.uploader.destroy(bannerData.banner.image.public_id);
            }

            const response = await cloudinary.v2.uploader.upload(image, {
                folder: "Layout",
            });

            const banner = {
                image: {
                    public_id: response.public_id,
                    url: response.secure_url,
                },
                title,
                subTitle,
            };

            if (bannerData) {
                await layoutModel.findByIdAndUpdate(bannerData._id, { banner }, { new: true });
            } else {
                await layoutModel.create({ type: "Banner", banner });
            }
        }

        if (type === "FAQ") {
            const { faq } = req.body;

            const faqItems = faq.map((item: any) => ({
                question: item.question,
                answer: item.answer,
            }));

            const faqData = await layoutModel.findOne({ type: "FAQ" });

            if (faqData) {
                await layoutModel.findByIdAndUpdate(faqData._id, { faq: faqItems }, { new: true });
            } else {
                await layoutModel.create({ type: "FAQ", faq: faqItems });
            }
        }

        if (type === "Categories") {
            const { categories } = req.body;

            const categoryItems = categories.map((item: any) => ({
                title: item.title,
            }));

            const categoryData = await layoutModel.findOne({ type: "Categories" });

            if (categoryData) {
                await layoutModel.findByIdAndUpdate(categoryData._id, { categories: categoryItems }, { new: true });
            } else {
                await layoutModel.create({ type: "Categories", categories: categoryItems });
            }
        }

        res.status(201).json({
            success: true,
            message: "Layout updated successfully",
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// get layout by type
export const getLayoutByType = CatchAsyncError( async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {type} = req.body;
        const layout = await layoutModel.findOne({type});
        res.status(200).json({
            success: true,
            layout,
        })
        
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})