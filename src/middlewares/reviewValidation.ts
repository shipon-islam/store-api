import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import createHttpError from "http-errors";
import { userModel } from "../models/userModel";

export const checkReviewField = [
  body("comment").optional(),
  body("rate").notEmpty().withMessage("rating is required"),
  body("userId")
    .notEmpty()
    .withMessage("user id is required")
    .custom(async (value) => {
      try {
        const user = await userModel.findById(value);
        if (!user) {
          throw createHttpError("user not found exist!");
        }
      } catch (err: any) {
        throw createHttpError(err.message);
      }
    }),
];
export const reviewValidateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewError = validationResult(req).mapped();
  if (Object.entries(reviewError).length === 0) {
    next();
  } else {
    res.status(409).json({
      success: false,
      status: 409,
      data: reviewError,
    });
  }
};
