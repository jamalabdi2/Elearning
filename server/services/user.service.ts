import userModel from "../models/user.model";
import { Response } from "express";
import { redis } from "../utils/redis";

// get user by id

export const getUserById = async (id: string, res: Response) => {
  const userFromRedis = await redis.get(id);
  if (userFromRedis) {
    const user = JSON.parse(userFromRedis);
    return res.status(200).json({
      success: true,
      user,
    });
  }
  return res.status(404).json({
    success: false,
    message: "User does not exists",
  });
};

//get all users

export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    users,
  });
};

//update user role

export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
  res.status(200).json({
    success: true,
    user,
    message: "User role updated successfully",
  });
};
