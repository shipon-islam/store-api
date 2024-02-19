import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    maxlength: [20, "maximum name length must be 10"],
  },
  avatar: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/shiponislam/image/upload/v1707759251/store-api/avatar/defalt.jpg",
  },
  email: {
    type: String,
    required: [true, "email name is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value: string) => {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: "please enter valid email",
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [5, "minimum password length must be 5"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

//hash password afer save user
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  } catch (error: any) {
    return next(error);
  }
});
export const userModel = model("User", userSchema);
