import express from "express";
import * as userSchema from "../../models/User.js";
import { validateBody } from "../../decorators/index.js";
import authControllers from "../../controllers/auth/auth-controlles.js";

const authRouter = express.Router();
const userSingUpValidate = validateBody(userSchema.userSingUpSchema);

authRouter.post("/singup", userSingUpValidate, authControllers.singUp);
export default authRouter;