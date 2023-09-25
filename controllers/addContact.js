import Contact from "../models/Contact.js";
import fs from "fs/promises";
import path from "path";

const pathPublic = path.resolve("public","avatars");
export const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(req.body);
  console.log(req.file);
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(pathPublic, filename);
  fs.rename(oldPath, newPath);
  const avatarUrl = path.join("http://localhost:3000" ,"public", "avatars", filename)
  const newContact = await Contact.create({... req.body, avatarUrl, owner });
  res.status(201).json(newContact); 
};