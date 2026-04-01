import { Book, Category } from "../models/index.js";
import { Op } from "sequelize";
import fs from "fs";

export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      category_id,
      quantity,
      available_quantity,
      description,
    } = req.body;

    // Validation pour que la quantite disponible ne soit pas superieur au stockkkkkkkkk
    // on utilise parseInt car formData envoie du string donc on convertit
    const finalQuantity = parseInt(quantity);
    const finalAvailable =
      available_quantity !== undefined
        ? parseInt(available_quantity)
        : finalQuantity;

    if (finalAvailable > finalQuantity) {
      return res.status(400).json({
        error:
          "La quantité disponible ne peut pas dépasser la quantité totale",
      });
    }

    const cover_image = req.file ? req.file.filename : null;

    const book = await Book.create({
      title,
      author,
      isbn,
      category_id,
      quantity,
      available_quantity: available_quantity ?? quantity,
      description,
      cover_image,
    });

    return res.status(201).json(book);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { search, category_id, page = 1, limit = 10 } = req.query;

    const where = {};

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { author: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category_id) {
      where.category_id = category_id;
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Book.findAndCountAll({
      where,
      include: [
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      books: rows,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404);
      json({ message: "Livre non trouve" });
    }

    const {
      title,
      author,
      isbn,
      category_id,
      quantity,
      available_quantity,
      description,
    } = req.body;


    // formData est un peu chiant lui il n'envoit que du string donc parseInt pour convertir
    const finalQuantity =
      quantity !== undefined ? parseInt(quantity) : book.quantity;
    const finalAvailable =
      available_quantity !== undefined
        ? parseInt(available_quantity)
        : book.available_quantity;


    // ici une petite validation car messoougno guiss quantite disponible bouy depasse stock c'est lunaire
    if (finalAvailable > finalQuantity) {
      return res.status(400).json({
        error:
          "La quantité disponible ne peut pas dépasser la quantité totale.",
      });
    }

    // alors ici on rencontre souvent un probleme c'est que a chaque fois qu'on modifier on etait oblige
    // de upload la photo a nouveau donc on a fait simple si one ne met une nouvelle photo il prend l'ancienne
    // par contre si il y a une nouvelle il supprime l'ancien
    const cover_image = req.file ? req.file.filename : book.cover_image;
    if (req.file && book.cover_image) {
      const oldPath = `uploads/${book.cover_image}`;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }


    await book.update({
      title,
      author,
      isbn,
      category_id,
      quantity,
      available_quantity: available_quantity ?? quantity,
      description,
      cover_image,
    });

    return res.status(201).json(book);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "livre non trouve" });
    }
    const path = `uploads/${book.cover_image}`;

    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    await book.destroy();
    return res.status(200).json({ message: "Livre supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
