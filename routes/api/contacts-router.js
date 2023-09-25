import express from "express";
import contactsService from "../../controllers/index.js"; 
import contactValidation from "../../middlewares/contact-validation.js"; 
import isValidId from "../../middlewares/isValidId.js"; 
import authenticate from "../../middlewares/authenticate.js";
//import upload from "../../middlewares/upload.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsService.listContacts);

contactsRouter.get("/:id", isValidId, contactsService.getContactById); 

contactsRouter.post("/", contactValidation.contactValidate, contactsService.addContact);

contactsRouter.delete("/:id", isValidId, contactsService.removeContact);
 
contactsRouter.put("/:id", isValidId, contactsService.updateContactById);

contactsRouter.patch("/:id/favorite", isValidId, contactValidation.contactFavoritValidate,
    contactsService.updateStatusContact); 


export default contactsRouter; 
