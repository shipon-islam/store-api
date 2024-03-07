import { Schema, model } from "mongoose";
const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: {
    type: Number,
    required: true,
    default: 1,
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
export const cartModel = model("Card", cartSchema);
