import Contact from "../models/Contact.js";
//import fs from "fs/promises";
//import path from "path";

// const pathPublic = path.resolve("public","avatars");
export const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  
// const { path: oldPath, filename } = req.file;
//  const newPath = path.join(pathPublic, filename);
//  fs.rename(oldPath, newPath);
//  const avatarUrl = path.join("http://localhost:3000" ,"public", "avatars", filename)
  const newContact = await Contact.create({... req.body, owner });
  res.status(201).json(newContact); 
};