import Joi from 'joi';

export const memberSchema = Joi.object({
    first_name: Joi.string()
                .min(2)
                .required(),
    last_name: Joi.string()
                .min(2)
                .required(),
    email: Joi.string()
                .email()
                .required(),
    phone: Joi.string()
                .min(9)
                .required(),
    address: Joi.string().allow('', null),

    status: Joi.string()
            .valid('Actif', 'Inactif')
});