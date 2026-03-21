import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    description : {
        type: DataTypes.TEXT,
        allowNull: true,
        
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate:{
          min:0,
        },
      },
      available_quantity:{
        type:DataTypes.INTEGER,
        default: 1,
      },
      cover_image:{
        type: DataTypes.STRING,
        allowNull: false,
      },
  });

export default Book;
