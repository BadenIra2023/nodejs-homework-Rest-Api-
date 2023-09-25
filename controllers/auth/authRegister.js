import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";
import gravatar from "gravatar";

export const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email already exist");
    }
    const avatarURL = gravatar.url(email);
    
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarUrl: avatarURL});
    
    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        avatarURL: newUser.avatarUrl,
        subscription: newUser.subscription,
    });
}