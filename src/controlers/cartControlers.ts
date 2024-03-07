import { NextFunction, Request, Response } from "express";
import { cartModel } from "../models/cartModel";

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, productId, totalAmount, subTotal, quantity } = req.body;
  try {
    const cartItems = await cartModel.create({
      user: userId,
      product: productId,
      subTotal: Number(subTotal),
      quantity: Number(quantity),
      totalAmount: Number(totalAmount),
    });
    res.status(201).json({
      success: true,
      status: 201,
      data: cartItems,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const deletedCart = await cartModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      status: 200,
      data: deletedCart,
    });
  } catch (error) {
    next(error);
  }
};
export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const { quantity } = req.body;
  try {
    const updatedCart = await cartModel.findByIdAndUpdate(id, {
      quantity: Number(quantity),
    });
    res.status(200).json({
      success: true,
      status: 200,
      data: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};
export const getCartByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    const carts = await cartModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .populate(["product"]);
    res.status(200).json({
      success: true,
      status: 200,
      data: carts,
    });
  } catch (error) {
    next(error);
  }
};
