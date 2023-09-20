import { ctrlWrapper } from "../../decorators/index.js";
import {getCurrent} from "../auth/authcurrent.js";
import {logout} from "../auth/authLogout.js";
import {register} from "../auth/authRegister.js";
import {login} from "../auth/authLogin.js";


export default {
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),}