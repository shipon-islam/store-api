import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { JWT_EXPIRE, JWT_SECRET } from "../secret";

export const generateToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};
export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};
