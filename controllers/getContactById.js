import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";

export const getContactById = async (req, res) => {
const { id } = req.params;
const result = await Contact.findById(id);
   if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json(result);
}