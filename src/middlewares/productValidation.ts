import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
export const checkProductField = [
  body("name")
    .notEmpty()
    .withMessage("product name is required")
    .isLength({ min: 5, max: 150 })
    .trim(),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 5, max: 2000 })
    .trim(),
  body("price").notEmpty().withMessage("price is required"),
  body("stock").optional(),
  body("category").notEmpty().withMessage("category id is required"),
  body("subcategory").notEmpty().withMessage("subcategory id is required"),
  body("features").optional(),
  body("discount").optional(),
  body("rating").optional(),
];

export const productValidateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productError = validationResult(req).mapped();
  try {
    if (Object.entries(productError).length === 0) {
      next();
    } else {
      res.status(409).json({
        success: false,
        status: 409,
        error: productError,
      });
    }
  } catch (error: any) {
    next(error);
  }
};
