import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const checkCartField = [
  body("productId").notEmpty().withMessage("product id is required"),
  body("userId").notEmpty().withMessage("user id is required"),
  body("totalAmount").notEmpty().withMessage("total amount is required"),
  body("subTotal").notEmpty().withMessage("subtotal is required"),
  body("quantity").optional(),
];
export const cartValidateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cartError = validationResult(req).mapped();
  if (Object.entries(cartError).length === 0) {
    next();
  } else {
    res.status(409).json({
      success: false,
      status: 409,
      data: cartError,
    });
  }
};
