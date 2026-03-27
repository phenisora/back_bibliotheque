import express from "express";
import { createBook, deleteBook, getBooks, updateBook } from "../controllers/book.controllers.js";
import { bookSchema } from "../validations/bookValidation.js";
import { validateData } from "../middleware/validation.js";
import { upload } from "../middleware/upload.js";
import {auth} from "../middleware/auth.js";

const router = express.Router();

router.use(auth); 

router.post("/create", upload.single("cover_image"), validateData(bookSchema), createBook);
router.get("/", getBooks);
router.put("/:id", upload.single("cover_image"), validateData(bookSchema), updateBook);
router.delete("/:id",deleteBook);

export default router;