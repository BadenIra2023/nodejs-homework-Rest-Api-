import { ctrlWrapper } from "../../decorators/index.js";
import {getCurrent} from "../auth/authcurrent.js";
import {logout} from "../auth/authLogout.js";
import {register} from "../auth/authRegister.js";
import { login } from "../auth/authLogin.js";
import { updateAvatar } from "../auth/updateAvatar.js";
import { verify } from "../auth/authVerify.js";
import { resendVerifyEmail } from "../auth/resendVerifyEmail.js";

export default {
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    updateAvatar: ctrlWrapper(updateAvatar),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),}