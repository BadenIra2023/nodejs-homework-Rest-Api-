import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true,});
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json(result);
}; 