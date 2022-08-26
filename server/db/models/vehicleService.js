require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: "localhost",
  dialect: "postgres",
});

const VehicleService = sequelize.define("vehicleService", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    onDelete: 'CASCADE',
  },
  vehicleId: {
    type: Sequelize.INTEGER,
    onDelete: "CASCADE",
    references: {
      model: "vehicles", // <----- name of the table
      key: "id", // <----- primary key
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    onDelete: "CASCADE",
    references: {
      model: "users", // <----- name of the table
      key: "id", // <----- primary key
    },
  },
  pickUpTime: {
    type: Sequelize.TIME,
  },
  pickUpDate: {
    type: Sequelize.DATE,
  },
  pickUpAddress1: {
    type: Sequelize.STRING,
  },
  pickUpCity: {
    type: Sequelize.STRING,
  },
  pickUpState: {
    type: Sequelize.STRING,
  },
  pickUpZipCode: {
    type: Sequelize.STRING,
  },
  dropOffTime: {
    type: Sequelize.TIME,
  },
  dropOffDate: {
    type: Sequelize.DATE,
  },
  dropOffAddress1: {
    type: Sequelize.STRING,
  },
  dropOffCity: {
    type: Sequelize.STRING,
  },
  dropOffState: {
    type: Sequelize.STRING,
  },
  dropOffZipCode: {
    type: Sequelize.STRING,
  },
});

VehicleService.sync({
  force: false,
  alter: true,
});

module.exports = VehicleService;
