import express from 'express';
import {creerMembre, getMembre,modifierMembre ,supprimerMembre,rechercherMembre} from '../controllers/member.controllers.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get("/",auth,getMembre);

router.post("/",auth, creerMembre);

router.put("/:id",auth,modifierMembre);

router.delete("/:id",auth,supprimerMembre);

router.get("/search",auth,rechercherMembre);





export default router;
