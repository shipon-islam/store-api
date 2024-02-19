import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const checkOrderField = [
  body("products").notEmpty().withMessage("products is required"),
  body("userId").notEmpty().withMessage("user id is required"),
  body("totalAmount").notEmpty().withMessage("total amount is required"),
  body("subTotal").notEmpty().withMessage("subtotal is required"),
  body("deliveryCharge").notEmpty().withMessage("delivery charge is required"),
  body("quantity").optional(),
  body("phone")
    .notEmpty()
    .withMessage("phone charge is required")
    .custom((value) => /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(value))
    .withMessage("number is invalid"),
  body("address").notEmpty().withMessage("address is required"),
];
export const orderValidateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderError = validationResult(req).mapped();
  if (Object.entries(orderError).length === 0) {
    next();
  } else {
    res.status(409).json({
      success: false,
      status: 409,
      data: orderError,
    });
  }
};
