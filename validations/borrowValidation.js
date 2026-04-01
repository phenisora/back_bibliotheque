import Joi from 'joi';

export const borrowSchema = Joi.object({
    
    member_id: Joi.number().integer().required(),
    book_id: Joi.number().integer().required(),
    
    // Validation des dates
    due_date: Joi.date().iso().greater('now').required().messages({
        'date.greater': "La date d'échéance doit être postérieure à aujourd'hui."
    }),
    
 
    status: Joi.string().valid('borrowed', 'returned', 'overdue')
});