import express from "express";
import { getBooksStats, getMembersStats, getBorrowsStats } from "../controllers/stats.controllers.js";
import {auth} from "../middleware/auth.js";

const router = express.Router();

router.use(auth);
router.get("/books", getBooksStats);
router.get("/members", getMembersStats);
router.get("/borrows", getBorrowsStats);

export default router;
