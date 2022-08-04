require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: "localhost",
  dialect: "postgres",
});

const Vehicle = sequelize.define("vehicle", {
  userId: {
    type: Sequelize.INTEGER
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
});

Vehicle.sync({
  force: false,
  alter: true
});

module.exports = Vehicle;
