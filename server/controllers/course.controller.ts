import e, { Request, Response, NextFunction, response } from "express";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { createCourse,getAllCoursesService } from "../services/course.service";
import courseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import { sendMail } from "../utils/sendMail";
import notificationModel from "../models/notification.model";

//upload course

export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      if (thumbnail) {
        const response = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "Courses",
        });
        data.thumbnail = {
          public_id: response.public_id,
          url: response.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//edit course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const courseId = req.params.id;
      console.log(courseId);
      const thumbnail = data.thumbnail;

      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);
        const response = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "Courses",
        });
        data.thumbnail = {
          public_id: response.public_id,
          url: response.secure_url,
        };
      }
      const course = await courseModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Course updated",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get single course without purchasing

export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      const courseInRedis = await redis.get(courseId);
      if (courseInRedis) {
        const course = JSON.parse(courseInRedis);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await courseModel
          .findById(courseId)
          .select(
            "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
          );

        if (!course) {
          return next(new ErrorHandler("course does not exists", 404));
        }

        await redis.set(courseId, JSON.stringify(course),"EX", 604800);  //7days
        res.status(200).json({
          success: true,
          message: "Single course retrieved",
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all courses without purchasing

export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const coursesInRedis = await redis.get("allCourses");
      if (coursesInRedis) {
        const allCourses = JSON.parse(coursesInRedis);
        res.status(200).json({
          success: true,
          allCourses,
        });
      } else {
        const allCourses = await courseModel
          .find()
          .select(
            "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
          );
        await redis.set("allCourses", JSON.stringify(allCourses));
        res.status(200).json({
          success: true,
          message: "All Courses retrieved",
          allCourses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get course content for valid user

export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );
      if (!courseExists) {
        return next(
          new ErrorHandler("You are not allowed to access this course.", 404)
        );
      }
      const course = await courseModel.findById(courseId);
      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add question in course

interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId } = req.body as IAddQuestionData;

      validateObjectId(courseId, "course id", next);
      validateObjectId(contentId, "content id", next);

      const course = await courseModel.findById(courseId);
      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      courseContent.questions.push(newQuestion);
      await notificationModel.create({
        user: req?.user?._id,
        title: "New Question Received",
        message: `You have a new question in ${courseContent?.title} from ${req?.user?.name}`
      })

      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add answer course question
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId } =
        req.body as IAddAnswerData;

      validateObjectId(courseId, "course id", next);
      validateObjectId(contentId, "content id", next);

      const course = await courseModel.findById(courseId);

      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const question = courseContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );
      if (!question) {
        return next(new ErrorHandler("Invalid question id", 400));
      }

      const newAnswer: any = {
        user: req.user,
        answer,
      };

      question.questionReplies?.push(newAnswer);
      await course?.save();

      if (req.user?._id === question.user._id) {
        //notify user
        await notificationModel.create({
          user: req.user?._id,
          title: "New Question Reply Recieved",
          message: `You have a new answer from ${courseContent?.title}`
      })
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          data
        );
        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: "../question-reply.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add review
interface IAddReviewData {
    review: string;
    rating: number;
    userId: string;
}


export const addReview = CatchAsyncError( async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;
 

        const courseExists = userCourseList?.some((course: any) => course.courseId.toString() === courseId.toString());
        if(!courseExists){
            return next(new ErrorHandler("You are not eligible to access this course",404));
        }

        const course = await courseModel.findById(courseId);
        if(!course){
            return next(new ErrorHandler("course does not exists",404));
        }

        const {review, rating} = req.body as IAddReviewData;
        const reviewData: any = {
            user: req.user,
            comment: review,
            rating,
        }
        course?.reviews.push(reviewData);
        
        let average = 0;
        const totalReviews = course.reviews.length

        course?.reviews.forEach((value: any) => {
            average += value.rating;
        })

        course.ratings = average / totalReviews;
        await course?.save()
        
        const notification = {
            title: "New Review Received",
            message: `${req.user?.name} has given a review in ${course?.name}`

        }
        //TODO notification
        res.status(200).json({
            success: true,
            message: "review added",
            course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// reply to reviews
interface IAddReviewData{
    comment: string;
    courseId: string;
    reviewId: string;
}

export const addReplyToReview = CatchAsyncError (async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {comment, courseId, reviewId} = req.body as IAddReviewData;

        const course = await courseModel.findById(courseId);
        if(!course){
            return next (new ErrorHandler("course not found",404));
        }

        const review = course?.reviews?.find((value: any) => value._id.toString() === reviewId);
        if(!review){
            return next (new ErrorHandler("review not found",404))
        }

        const replyData:any = {
            user: req.user,
            comment
        }
        if(!review.commentReplies){
            review.commentReplies = [];
        }
        review.commentReplies.push(replyData)

        await course?.save();

        res.status(200).json({
            success: true,
            course
        })

    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// get all courses for admin

export const getAllCoursesAdmin = CatchAsyncError (async (req:Response, res:Response, next:NextFunction) => {
  try {
    getAllCoursesService(res);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
} )

//delete user --admin only

export const deleteCourse = CatchAsyncError( async(req:Request, res:Response, next:NextFunction) => {
  try {
    const {id} = req.params;

    const course = await courseModel.findById(id);

    if(!course){
      return next(new ErrorHandler("Course not found",404))
    }

    await course.deleteOne()

    await redis.del(id);

    res.status(200).json({
      success: true,
      message: "course deleted successfully"
    })
    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 500));
  }
})




export const validateObjectId = (
  id: string,
  fieldName: string,
  next: NextFunction
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler(`Invalid ${fieldName}`, 400));
  }
};


