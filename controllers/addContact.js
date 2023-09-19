import Contact from "../models/Contact.js";

export const addContact = async (req, res) => {
  const {_id: owner} = req.user;
   const newContact = await Contact.create({... req.body, owner });
  res.status(201).json(newContact); 
};