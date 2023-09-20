import express from "express";
import * as userSchema from "../../models/User.js";
import { validateBody } from "../../decorators/index.js";
import authControllers from "../../controllers/auth/auth-controlles.js";
import authenticate from "../../middlewares/authenticate.js";

const authRouter = express.Router();
const userSingUpValidate = validateBody(userSchema.userSingUpSchema);
const userSingInValidate = validateBody(userSchema.userSingInSchema);

authRouter.post("/register", userSingUpValidate, authControllers.singUp);
authRouter.post("/login", userSingInValidate, authControllers.singIn);
authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.post("/logout", authenticate, authControllers.logout);
export default authRouter;