import { NextFunction, Request, Response } from "express";
import { orderModel } from "../models/orderModel";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    products,
    totalAmount,
    subTotal,
    deliveryCharge,
    quantity,
    phone,
    address,
  } = req.body;
  try {
    const orders = await orderModel.create({
      user: userId,
      products,
      subTotal: Number(subTotal),
      quantity: Number(products.length) || Number(quantity),
      totalAmount: Number(totalAmount),
      deliveryCharge: Number(deliveryCharge),
      phone,
      address,
    });
    res.status(201).json({
      success: true,
      status: 201,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 })
      .populate(["products", "user"]);

    res.status(200).json({
      success: true,
      status: 200,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
export const getOrderByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    const orders = await orderModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .populate(["products", "user"]);
    res.status(200).json({
      success: true,
      status: 200,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
