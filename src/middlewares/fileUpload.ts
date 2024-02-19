import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { multerUploader } from "../lib/multer";

export const avatarUploader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //call multer configure uploader function
  const uploader = multerUploader(1000000, [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ]);
  //upload single file and check errors
  uploader.single("avatar")(req, res, (error) => {
    if (error) {
      next(createError(400, error.message));
    }
    next();
  });
};
export const productImageUploader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //call multer configure uploader function
  const uploader = multerUploader(1000000, [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ]);
  //upload single file and check errors
  uploader.fields([
    { name: "cover", maxCount: 1 },
    { name: "feature", maxCount: 2 },
  ])(req, res, (error) => {
    if (error) {
      next(createError(400, error.message));
    }
    next();
  });
};
