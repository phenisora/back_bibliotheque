import express from 'express';
import { register,login,getProfile} from '../controllers/user.controllers.js';
import {registerSchema} from '../validations/authValidation.js';
import {validateData} from '../middleware/validation.js';
import { auth } from "../middleware/auth.js";


const router = express.Router();



router.post('/register',validateData(registerSchema),register);

router.post('/login',login);

router.get('/profile', auth, getProfile);

export default router;