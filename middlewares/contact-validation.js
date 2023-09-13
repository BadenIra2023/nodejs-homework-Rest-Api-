
import contactsSchemas from "../schemas/joi.js";
import { validateBody } from "../decorators/index.js";

const contactValidate = validateBody(contactsSchemas.contactAddSchema);
const contactFavoritValidate = validateBody(
  contactsSchemas.contactFavoriteSchema
);

export default { contactValidate, contactFavoritValidate };
