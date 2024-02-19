import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_CLOUD_URL = process.env.MONGODB_CLOUD_URL as string;
export const CLOUDNARY_CLOUD_NM = process.env.CLOUDNARY_CLOUD_NM;
export const CLOUDNARY_API_KEY = process.env.CLOUDNARY_API_KEY;
export const CLOUDNARY_SECRET = process.env.CLOUDNARY_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRE = process.env.JWT_EXPIRE as string;
