import { Request, Response, NextFunction } from 'express';
import { CatchAsyncError } from './catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import jwt from 'jsonwebtoken';
import { redis } from '../utils/redis';

export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.cookies.access_token as string;

  if (!access_token) {
    return next(new ErrorHandler('Authorization failed: Access token is missing.', 401));
  }

  try {
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as jwt.JwtPayload;
    const user = await redis.get(decoded.id);

    if (!user) {
      return next(new ErrorHandler('Authorization failed: Please login.', 401));
    }

    req.user = JSON.parse(user);
    next();
  } catch (error) {
    return next(new ErrorHandler('Authorization failed: Access token is invalid or expired.', 401));
  }
});


export const authorizeRoles = (...roles: string[]) =>{
  return (req:Request, res:Response, next:NextFunction) => {
    if(!roles.includes(req.user?.role || '')){
      console.log(req.user)
      return next (new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`,403))
    }
    next();
  }

}