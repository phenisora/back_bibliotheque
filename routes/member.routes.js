import express from 'express';
import {creerMembre, getMembre,modifierMembre ,supprimerMembre} from '../controllers/member.controllers.js';
import { auth } from '../middleware/auth.js';
import { memberSchema } from "../validations/memberValidation.js";
import { validateData } from "../middleware/validation.js";

const router = express.Router();

router.get("/",auth,getMembre);

router.post("/",auth, validateData(memberSchema),creerMembre);

router.put("/:id",auth,validateData(memberSchema),modifierMembre);

router.delete("/:id",auth,supprimerMembre);







export default router;
