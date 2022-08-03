require("dotenv").config();
const Sequelize = require("sequelize");
const util = require("util");
const databaseName = "vicar";
require("./models/index.js");

const db =
  process.env.NODE_ENV === "production"
    ? new Sequelize(process.env.DATABASE_URL, {
        logging: false,
      })
    : new Sequelize(process.env.DATABASE_URL, {
        host: "localhost",
        dialect: "postgres",
        logging: false,
      });

db.authenticate()
  .then(() => {
    console.log(
      `Connected to ${
        process.env.NODE_ENV === "production"
          ? `AWS!`
          : `Local postgresql called: ${databaseName}`
      }`,
    );
  })
  .catch((err) => {
    console.error("NOT Connected to AWS RDS:", err);
  });

module.exports = db;
