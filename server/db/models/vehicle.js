require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: "localhost",
  dialect: "postgres",
});

const Vehicle = sequelize.define("vehicle", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "users", // <----- name of the table
      key: "id", // <----- primary key
    },
  },
  nickName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  year: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: false,
  },
  make: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  model: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  isCarParked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

Vehicle.sync({
  force: false,
  alter: true,
});

module.exports = Vehicle;
