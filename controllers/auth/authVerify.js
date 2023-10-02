import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";

export const verify = async (req, res) => {
    const { verificationToken } = req.params;
     console.log(req.params);
    const user = await User.findOne({verificationToken});
    console.log(user)
    if (!user) {
        throw HttpError(404,"User not found");
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

    res.json({ message: "Verification successful"})
}