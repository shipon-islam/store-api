import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(createError(404, "requested page not found!"));
};

export const errorHandler = (
  error: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    const statusCode = error.status ? error.status : 500;
    res.status(statusCode);
    res.json({
      success: false,
      status: statusCode,
      error: error?.message ? error.message : error,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
};

module.exports = { errorHandler, notFoundHandler };
