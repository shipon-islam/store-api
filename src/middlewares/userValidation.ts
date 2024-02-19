import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import createHttpError from "http-errors";
import { userModel } from "../models/userModel";

export const checkUserField = [
  body("name").notEmpty().withMessage("name is required").trim().escape(),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail()
    .custom(async (value) => {
      try {
        const user = await userModel.findOne({ email: value });
        if (user) {
          throw createHttpError("email already exist!");
        }
      } catch (err: any) {
        throw createHttpError(err.message);
      }
    }),
  body("password").notEmpty().withMessage("password is required").isLength({
    min: 5,
    max: 15,
  }),
];
export const userValidateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userError = validationResult(req).mapped();
  if (Object.entries(userError).length === 0) {
    next();
  } else {
    res.status(409).json({
      success: false,
      status: 409,
      data: userError,
    });
  }
};
