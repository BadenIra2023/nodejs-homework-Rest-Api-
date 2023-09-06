import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts", "contacts.json");

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
const contacts = await listContacts();
const result = contacts.find(contact => contact.id === contactId);
return result || null;
}


const removeContact = async (contactId) => {
  const contacts = await listContacts();
const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
const [result] = contacts.splice(index, 1);
await updateContacts(contacts);
return result;
}

const addContact = async ({name, email, phone}) => {
const contacts = await listContacts();
const newContact = { id: nanoid(), name, email, phone};
contacts.push(newContact);
await updateContacts(contacts);
return newContact;
}

const updateContactById = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
 contacts[index] = {id, ...body};
 await updateContacts(contacts);
 return  contacts[index];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}