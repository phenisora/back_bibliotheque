import express from 'express';
import { getEmprunts,creerEmprunt,retournerLivre} from '../controllers/borrow.controllers.js';
import { auth } from '../middleware/auth.js'; 

const router = express.Router();

router.get('/', auth, getEmprunts);

router.post('/', auth, creerEmprunt);

router.put('/return/:id', retournerLivre);

export default router;