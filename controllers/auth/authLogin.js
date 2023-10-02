import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;


export const login = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }
    if (!user.verify) { 
         throw HttpError(401, "Email not verify");
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        throw HttpError(401, "Email or password invalid");
    }
    const { _id: id } = user;

    const payload = { id, };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });

    res.json({ token, user: { email, subscription: user.subscription } });
}
