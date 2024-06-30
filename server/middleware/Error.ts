import { NextFunction, Request,Response } from 'express'
import ErrorHandler from '../utils/ErrorHandler'


export const ErrorMiddleware = (error:any,req:Request, res:Response, next:NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Internal Server Error';

    //cast error
    if(error.name === 'CastError'){
        const message = `Resource not found. Invalid: ${error.path}`;
        error = new ErrorHandler(message,400);
    }

    //duplicate key error
    if(error.code === 1100){
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
        error = new ErrorHandler(message,400);
    }

    //json webtoken expired error
    if(error.name === 'TokenExpiredError'  || error.message === 'jwt expired'){
        const message = 'Json web token is expired, try again';
        error = new ErrorHandler(message,400);
    }

    //wrong jwt token error
    if(error.name === 'JsonWebTokenError'){
        const message = 'Json web token is expired, try again';
        error = new ErrorHandler(message,400);
    }


    //JWT malformed error
    if(error.name === 'jwt malformed'){
        const message = 'JSON web Token is malformed';
        error = new ErrorHandler(message, 400);
    }

    console.log('ErrorHandler function is called: .....')
    console.log(error.message)
    // console.log(error)
    res.status(error.statusCode).json({
        success: false,
        message: error.message
    })
};

