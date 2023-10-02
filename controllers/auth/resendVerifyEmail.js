import User from "../../models/User.js";
import { HttpError, sendEmail } from "../../helpers/index.js";

export const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(404, "Missing required field email.");
    }
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed.");
    }
    const verifyEmail = {
        to: email,
        subject: "Resend email for verified user",
         html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
    }
    await sendEmail(verifyEmail);

    res.status(200).json({
         message: "Verification email sent"  })
    

}