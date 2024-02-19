import { Router } from "express";

import {
  addToCart,
  getCartByUserId,
  removeFromCart,
  updateCart,
} from "../controlers/cartControlers";
import { protect } from "../middlewares/authentication";
import {
  cartValidateHandler,
  checkCartField,
} from "../middlewares/cartValidate";
const router = Router();
router.post("/cart", protect, checkCartField, cartValidateHandler, addToCart);
router.delete("/cart/:id", protect, removeFromCart);
router.put("/cart/:id", protect, updateCart);
router.get("/cart/:userId", protect, getCartByUserId);
export default router;
