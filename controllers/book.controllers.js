import { Book, Category } from "../models/index.js";
import { Op } from "sequelize";
import fs from "fs"

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


export const updateBook = async(req,res)=>{
    try {
        const{id}= req.params;
        const book = await Book.findByPk(id);
        if(!book){
            return res.status(404);json({message : "Livre non trouve"});
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
      
          const cover_image = req.file ? req.file.filename : null;
      
    
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

export const deleteBook = async(req, res) =>{
   try {
        const {id} = req.params;
        const book = await Book.findByPk(id);
        if(!book){
            return res.status(404).json({message:"livre non trouve"});
        }
        const path = `uploads/${book.cover_image}`
  
        if (fs.existsSync(path)){
            fs.unlinkSync(path)
        }
  
    await book.destroy()
    } catch (error) {
    return res.status(500).json({ message: error.message });
    }
   
};