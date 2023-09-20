import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
const { JWT_SECRET } = process.env;

const singUp = async (req, res) => {
    const { email, password } = req.body;
     const user = await User.findOne({ email });
         if (user) {
                    throw HttpError(409, "Email already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword } );
    console.log( newUser)
    res.status(201).json({
    username: newUser.username,
    email: newUser.email,
    subscription: newUser.subscription,
  });
}
const singIn = async (req, res) => {
    const { email, password } = req.body;
    console.log( req.body)
    const user = await User.findOne({ email });
         if (!user) {
                    throw HttpError(401, "Email or password invalid");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
     if (!comparePassword) {
                    throw HttpError(401, "Email or password invalid");
    }
    const {_id :id} = user;

    const payload = { id, };
    console.log(payload)
    console.log(JWT_SECRET)

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h"});
    await User.findByIdAndUpdate(id, {token});

    res.json({ token, user: { email, subscription: user.subscription }});
}

const getCurrent = async (req, res) => {
    const { subscription, email } = req.user
    console.log(req.user)
    res.json({ email,
        subscription,    
    })
}

const logout = async (req, res) => {
    const { _id } = req.user
    console.log(req.user)
    await User.findByIdAndUpdate(_id, { token:"" })
    res.status(204);
}

export default {
    singUp: ctrlWrapper(singUp),
    singIn: ctrlWrapper(singIn),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
};