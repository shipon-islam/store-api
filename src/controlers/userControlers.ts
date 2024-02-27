import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { findImageFromURL } from "../helpers/imageURL";
import { comparePassword } from "../lib/bcrypt";
import { cloudinaryUpload, deleteCloudinaryImage } from "../lib/cloudinary";
import { generateToken } from "../lib/jsonWebToken";
import { userModel } from "../models/userModel";
import { userType } from "./../types/userType";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = { ...req.body } as userType;
  try {
    //upload image in cloudinary and assign url in user object
    if (req.file) {
      const { secure_url } = await cloudinaryUpload("avatar", req.file.path);
      user.avatar = secure_url;
    }
    //finally create new user
    const { role, _id, name, email, avatar } = await userModel.create(user);

    const token = generateToken(_id);
    res.status(201).json({
      success: true,
      status: 201,
      token: token,
      user: { email, name, avatar, role, id: _id },
    });
  } catch (error) {
    next(error);
  }
};
export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const { name } = req.body;
  const file = req.file;
  const user = {} as userType;
  if (name) user.name = name;
  try {
    if (file) {
      const { secure_url } = await cloudinaryUpload("avatar", file.path);
      user.avatar = secure_url;
    }
    // updated the specific user
    const updatedUser = await userModel.findByIdAndUpdate(id, user);
    //delete previous image if it not defalt.jpg
    if (updatedUser && file) {
      const { splitUrl, public_id } = findImageFromURL(
        "avatar",
        updatedUser.avatar
      );
      if (splitUrl !== "defalt.jpg") {
        await deleteCloudinaryImage(public_id);
      }
    }
    res.status(200).json({
      success: true,
      status: 200,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id).select("-password");
    res.status(200).json({
      success: true,
      status: 200,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUserbyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (deletedUser) {
      const { splitUrl, public_id } = findImageFromURL(
        "avatar",
        deletedUser.avatar
      );
      if (splitUrl !== "defalt.jpg") {
        await deleteCloudinaryImage(public_id);
      }
      res.status(204).json({
        success: true,
        status: 204,
        user: deletedUser,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({
      success: true,
      status: 200,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createError(400, "all fields are required"));
  }
  try {
    const user = await userModel.findOne({ email }).select("-password");
    if (user && (await comparePassword(password, user.password))) {
      const token = generateToken(user._id);
      res.status(200).json({
        success: true,
        status: 200,
        token: token,
        user: user,
      });
    } else {
      return next(createError(401, "invalid creadentials!"));
    }
  } catch (error) {
    next(error);
  }
};
export const passwordChange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, newPassword } = req.body;
  const id = req.params.id;
  if (!newPassword || !password) {
    return next(createError(400, "all fields are required"));
  }
  try {
    const user = await userModel.findById(id);
    if (user && (await comparePassword(password, user.password))) {
      //update the corresponding password and save to db
      user.password = newPassword;
      await user.save();
      res.status(200).json({
        success: true,
        status: 200,
        data: user,
      });
    } else {
      return next(createError(401, "invalid creadentials!"));
    }
  } catch (error) {
    next(error);
  }
};
// i didn't work forgot password ,i will do that
export const passwordForgot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (!email) {
    return next(createError(400, "email is required"));
  }
  try {
    const user = await userModel.findOne(email);
    if (user) {
      res.status(200).json({
        success: true,
        status: 200,
        data: user,
      });
    } else {
      return next(createError(401, "user not registered!"));
    }
  } catch (error) {
    next(error);
  }
};
