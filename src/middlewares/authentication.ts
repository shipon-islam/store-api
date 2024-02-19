import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { verifyToken } from "../lib/jsonWebToken";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.startsWith("Bearer")
      ? authorization.split(" ")[1]
      : null;
    if (!token) {
      return next(createError(401, "you don't have token! login first"));
    }
    const decoded: any = verifyToken(token);
    req.user = decoded ? { id: decoded.id } : undefined;
    next();
  } catch (error) {
    next(error);
  }
};
