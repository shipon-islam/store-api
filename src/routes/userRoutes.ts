import { Router } from "express";
import {
  createUser,
  deleteUserbyId,
  getUserById,
  getUsers,
  loginUser,
  passwordChange,
  passwordForgot,
  updateUserById,
} from "../controlers/userControlers";
import { protect } from "../middlewares/authentication";
import { avatarUploader } from "../middlewares/fileUpload";
import {
  checkUserField,
  userValidateHandler,
} from "../middlewares/userValidation";
const router = Router();

router.post(
  "/user",
  avatarUploader,
  checkUserField,
  userValidateHandler,
  createUser
);
router.put("/users/:id", protect, avatarUploader, updateUserById);
router.delete("/users/:id", protect, deleteUserbyId);
router.get("/users/:id", protect, getUserById);
router.get("/users", protect, getUsers);
router.post("/login", loginUser);
router.post("/users/:id/password", protect, passwordChange);
router.post("/forgot-password", passwordForgot);

export default router;
