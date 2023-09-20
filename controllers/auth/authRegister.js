import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    console.log(newUser)
    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        subscription: newUser.subscription,
    });
}