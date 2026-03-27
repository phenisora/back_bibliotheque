import sequelize from "../config/database.js";

import User from "./user.model.js";
import Member from "./member.model.js";
import Book from "./book.model.js";
import Category from "./category.model.js";
import Borrow from "./borrow.model.js";


Category.hasMany(Book,{foreignKey:"category_id", as: "books" });
Book.belongsTo(Category,{foreignKey:"category_id", as: "category"});

//member -> borrow

Member.hasMany(Borrow,{foreignKey:"member_id", as: "borrows"});
Borrow.belongsTo(Member,{foreignKey:"member_id", as: "member"});

//Book -> borrow
Book.hasMany(Borrow,{foreignKey:"book_id", as: "borrows" });
Borrow.belongsTo(Book,{foreignKey:"book_id", as: "book" })





export {sequelize, User, Member, Book, Borrow, Category}
