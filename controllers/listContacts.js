
import Contact from "../models/Contact.js";


export const listContacts = async (req, res) => {
const data = await Contact.find();
 res.status(200).json(data);
};
