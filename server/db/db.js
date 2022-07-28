const Sequelize = require("sequelize");
const databaseName = "vicar";

const db =
  process.env.NODE_ENV === "production"
    ? new Sequelize(process.env.DATABASE_URL, {
        // ssl: true,
        logging: false,
      })
    : new Sequelize(databaseName, "postgres", process.env.DB_PASSWORD, {
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
          : `Local postgresql called: ${databaseName}!`
      }`,
    );
  })
  .catch((err) => {
    console.log("NOT Connected to AWS RDS:", err);
  });

module.exports = { db };
