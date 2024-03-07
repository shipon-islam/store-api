import { Schema, model } from "mongoose";
const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: String,
    required: true,
  },
});
export const cartModel = model("Cart", cartSchema);
