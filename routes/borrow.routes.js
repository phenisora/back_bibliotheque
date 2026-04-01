import express from 'express';
import { getEmprunts,creerEmprunt,retournerLivre} from '../controllers/borrow.controllers.js';
import { auth } from '../middleware/auth.js'; 
import { borrowSchema } from "../validations/borrowValidation.js";
import { validateData } from "../middleware/validation.js";

const router = express.Router();

router.get('/', auth, getEmprunts);

router.post('/', auth, validateData(borrowSchema),creerEmprunt);

router.put('/return/:id', retournerLivre);

export default router;