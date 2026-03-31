
import { Book, Member, Borrow,sequelize } from "../models/index.js";
import { Op } from "sequelize";


export const getBooksStats = async (req, res) => {
  try {
    const totalBooks = await Book.count();
    const totalAvailable = await Book.count({
      where: { available_quantity: { [Op.gt]: 0 } },
    });

    return res.status(200).json({ totalBooks, totalAvailable });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const getMembersStats = async (req, res) => {
  try {
    const totalMembers = await Member.count();
    const activeMembers = await Member.count({
      where: { status: "active" },
    });

    return res.status(200).json({ totalMembers, activeMembers });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const getBorrowsStats = async (req, res) => {
  try {
    const totalBorrows = await Borrow.count();
    const activeBorrows = await Borrow.count({
      where: { status: "borrowed" },
    });
    const returnedBorrows = await Borrow.count({
      where: { status: "returned" },
    });
    const overdueBorrows = await Borrow.count({
      where: { status: "overdue" },
    });

    // Livres les plus empruntés
    const mostBorrowed = await Borrow.findAll({
      attributes: [
        "book_id",
        [sequelize.fn("COUNT", sequelize.col("book_id")), "borrow_count"],
      ],
      include: [{ model: Book, as: "book", attributes: ["title", "author"] }],
      group: ["book_id"],
      order: [[sequelize.literal("borrow_count"), "DESC"]],
      limit: 5,
    });

    return res.status(200).json({
      totalBorrows,
      activeBorrows,
      returnedBorrows,
      overdueBorrows,
      mostBorrowed,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};