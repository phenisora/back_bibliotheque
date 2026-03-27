import Joi from "joi";


export const bookSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(255)
        .required(),
    author: Joi.string()
        .min(1)
        .max(255)
        .required(),
    isbn: Joi.string()
        .max(20)
        .optional(),
    category_id: Joi.number()
        .integer()
        .required(),
    quantity: Joi.number()
        .integer()
        .min(1)
        .required(),
    available_quantity: Joi.number()
        .integer()
        .min(0)
        .optional(),
    description: Joi.string()
        .max(1000)
        .optional(),
  });