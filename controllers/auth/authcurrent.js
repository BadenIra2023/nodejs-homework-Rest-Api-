import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getCurrent = async (req, res) => {
    const { username, email } = req.user
    res.json({
        username,
        email,
        
    })
}
export default {getCurrent: ctrlWrapper(getCurrent)}