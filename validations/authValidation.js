import Joi from 'joi';

export const registerSchema = Joi.object({

  name: Joi.string()
    .min(2)
    .max(100)
    .required() 
    .messages({ 
        'string.base': 'Le nom doit être une chaîne de caractères',
        'string.empty': 'Le nom ne peut être vide',
        'string.min': 'Le nom doit compoter au moins trois caracteres',
        'string.max': 'Le nom doit compoter au max 30',
        
    }),

    email : Joi.string()  
        .email()
        .required()
        .messages({
             'string.base': 'Mettez un format de mail valide',
        }),
    
    password :Joi.string()
    .required()
    .messages({
        'string.min': 'Le mot de passe doit compter au moins six caracteres',

    })
    


})