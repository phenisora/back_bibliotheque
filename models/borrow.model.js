import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Borrow = sequelize.define(
  "Borrow",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    borrow_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      
    },
    return_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status:{
        type: DataTypes.ENUM('borrowed','returned','overdue'),
    },

  });

export default Borrow;
