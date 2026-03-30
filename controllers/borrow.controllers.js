import { Book, Borrow, Member } from "../models/index.js";
import { Op } from "sequelize";




// 1. Récupérer tous les emprunts  et filtrage par status

export const getEmprunts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const where = {};

  
    if (status && status !== "") {
      where.status = status; 
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Borrow.findAndCountAll({
      where, 
      include: [
        { model: Member, as: "member", attributes: ["id", "first_name", "last_name"] },
        { model: Book, as: "book", attributes: ["id", "title"] },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      borrows: rows,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



//2. Créer un emprunt 
export const creerEmprunt = async (req, res) => {
    try {
        const { member_id, book_id, due_date } = req.body;

        // 1. Verification de la dispo du livre
        const book = await Book.findByPk(book_id);
        if (!book || book.available_quantity < 1) {
            return res.status(400).json({ message: "Le livre n'est plus disponible." });
        }

        // 2. Verification du status des membres
        const member = await Member.findByPk(member_id);
        if (!member || member.status !== 'active') {
            return res.status(400).json({ message: "Le membre n'est pas autorisé à emprunter (compte inactif)." });
        }

        // 3. PRÉPARATION DES DONNÉES
        const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD pour MySQL

        // 4. creation de l'emprunt
        const newBorrow = await Borrow.create({
            member_id,
            book_id,
            due_date,
            borrow_date: today,
            status: 'borrowed'
        });

        // 5. update du stock
        await book.update({ 
            available_quantity: book.available_quantity - 1 
        });

        // 6.
        const resultat = await Borrow.findByPk(newBorrow.id, {
            include: [
                { model: Member, as: 'member', attributes: ['first_name', 'last_name'] },
                { model: Book, as: 'book', attributes: ['title', 'author'] }
            ]
        });

        res.status(201).json(resultat);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la création de l'emprunt", error: error.message });
    }
};

//3. Enregistrer le retour d'un livre

export const retournerLivre = async (req, res) => {
    try {
        const { id } = req.params; 

        // 1. Trouver l'emprunt
        const borrow = await Borrow.findByPk(id);
        if (!borrow) {
            return res.status(404).json({ message: "Emprunt non trouvé" });
        }

        // 2. 
        if (borrow.status === 'returned') {
            return res.status(400).json({ message: "Ce livre a déjà été retourné" });
        }

        // 3. Préparer la date du jour pour return_date
        const today = new Date().toISOString().split('T')[0];

        // 4. Mettre à jour l'emprunt 
        await borrow.update({
            status: 'returned',
            return_date: today
        });

        // 5. 
        const book = await Book.findByPk(borrow.book_id);
        if (book) {
            await book.update({
                available_quantity: book.available_quantity + 1
            });
        }

        res.status(200).json({
            message: "Livre retourné avec succès",
            borrow: borrow
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur lors du retour", error: error.message });
    }
};



    