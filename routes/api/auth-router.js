import express from "express";
import * as userSchema from "../../models/User.js";
import { validateBody } from "../../decorators/index.js";
import authenticate from "../../middlewares/authenticate.js";
import authController from "../../controllers/auth/index.js"; 
import upload from "../../middlewares/upload.js";

const authRouter = express.Router();
const userSingUpValidate = validateBody(userSchema.userSingUpSchema);
const userSingInValidate = validateBody(userSchema.userSingInSchema);
const userEmailValidate = validateBody(userSchema.userEmailSchema);

authRouter.post("/register", userSingUpValidate, authController.register);
authRouter.post("/login", userSingInValidate, authController.login);
authRouter.get("/verify/:verificationToken", authController.verify);
authRouter.post("/verify", userEmailValidate, authController.resendVerifyEmail);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.patch("/", authenticate, upload.single("avatar"), authController.updateAvatar);
export default authRouter;