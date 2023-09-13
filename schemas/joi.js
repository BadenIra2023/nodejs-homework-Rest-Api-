import Joi from "joi";

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"name" must be exist`
    }),
    email: Joi.string().required().messages({
        "any.required": `"email" must be exist`
    }),
    phone: Joi.string().required().messages({
        "any.required": `"phone" must be exist`
    }),
    favorite: Joi.boolean().default(false),
})
const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});


export default { contactFavoriteSchema, contactAddSchema };