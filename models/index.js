import sequelize from "../config/database.js";

import User from "./user.model.js";
import Member from "./member.model.js";
import Book from "./book.model.js";
import Category from "./category.model.js";
import Borrow from "./borrow.model.js";


Category.hasMany(Book,{foreignKey:"category_id"});
Book.belongsTo(Category,{foreignKey:"category_id"});

//member -> borrow

Member.hasMany(Borrow,{foreignKey:"member_id"});
Borrow.belongsTo(Member,{foreignKey:"member_id"});

//Book -> borrow
Book.hasMany(Borrow,{foreignKey:"book_id"});
Borrow.belongsTo(Book,{foreignKey:"book_id"})


export {sequelize, User,Member, Book, Borrow, Category}