import express from "express";
import * as userSchema from "../../models/User.js";
import { validateBody } from "../../decorators/index.js";
import authenticate from "../../middlewares/authenticate.js";
import authController from "../../controllers/auth/index.js"; 

const authRouter = express.Router();
const userSingUpValidate = validateBody(userSchema.userSingUpSchema);
const userSingInValidate = validateBody(userSchema.userSingInSchema);

authRouter.post("/register", userSingUpValidate, authController.register);
authRouter.post("/login", userSingInValidate, authController.login);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);
export default authRouter;