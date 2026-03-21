import express from 'express';
import { register,login} from '../controllers/user.controllers.js';
import {registerSchema} from '../validations/authValidation.js';
import {validateData} from '../middleware/validation.js';


const router = express.Router();



router.post('/register',validateData(registerSchema),register);

router.post('/login',login);

export default router;