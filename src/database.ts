import { connect } from "mongoose";
import { MONGODB_CLOUD_URL } from "./secret";

export const mongodb_connect = async () => {
  try {
    const connected = await connect(MONGODB_CLOUD_URL);
    if (connected) {
      console.log("db connected");
    }
  } catch (error) {
    console.log(error);
  }
};
