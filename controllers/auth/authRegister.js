import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { HttpError, sendEmail } from "../../helpers/index.js";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

export const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email already exist");
    }
    const avatarURL = gravatar.url(email);
    
    
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarUrl: avatarURL, verificationToken });
    const verifyEmail = {
        to: email,
        subject: "Verify email",
         html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to verify email</a>`,
    }
await sendEmail(verifyEmail);

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        avatarURL: newUser.avatarUrl,
        subscription: newUser.subscription,
    });
}