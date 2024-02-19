import { Router } from "express";
import {
  createOrder,
  getAllOrder,
  getOrderByUserId,
} from "../controlers/orderControler";
import { protect } from "../middlewares/authentication";
import {
  checkOrderField,
  orderValidateHandler,
} from "../middlewares/orderValidation";
const router = Router();
router.post(
  "/order",
  protect,
  checkOrderField,
  orderValidateHandler,
  createOrder
);
router.get("/orders/:userId", protect, getOrderByUserId);
router.get("/orders", protect, getAllOrder);
export default router;
