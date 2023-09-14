import { ctrlWrapper } from "../decorators/index.js";
import { listContacts } from "./listContacts.js";
import { addContact } from "./addContact.js";
import { getContactById } from "./getContactById.js";
import { removeContact } from "./removeContact.js";
import { updateContactById } from "./updateContactById.js";
import { updateStatusContact } from "./updateStatusContact.js";

export default {
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  updateContactById: ctrlWrapper(updateContactById),
  removeContact: ctrlWrapper(removeContact),
  updateStatusContact: ctrlWrapper(updateStatusContact), }