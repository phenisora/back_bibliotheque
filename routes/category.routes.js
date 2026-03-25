import express from 'express';
import { getCategories, creerCategory ,modifierCategory, supprimerCategory} from '../controllers/category.controllers.js';
import {validateData} from "../middleware/validation.js";
import { auth } from '../middleware/auth.js'; 
import {categorySchema} from "../validations/categoryValidation.js";

const router = express.Router();

router.get('/', auth, getCategories);

router.post("/",auth,validateData(categorySchema),creerCategory);

router.put('/:id',auth,validateData(categorySchema),modifierCategory);

router.delete('/:id',auth,supprimerCategory);

export default router;