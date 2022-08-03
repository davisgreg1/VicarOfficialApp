require("dotenv").config();
const crypto = require("crypto");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: "localhost",
  dialect: "postgres",
});

const User = sequelize.define("user", {
  firstName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue("password");
    },
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue("salt");
    },
  },
  //   email: {
  //     type: Sequelize.STRING,
  //     unique: true,
  //     allowNull: false,
  //   },

  //   zipCode: {
  //     type: Sequelize.STRING,
  //     // allowNull: true
  //   },
  //   phoneNumber: {
  //     type: Sequelize.BIGINT,
  //     // unique: true
  //   },
  //   personalityType: {
  //     type: Sequelize.STRING,
  //   },
  //   userIdentity: {
  //     type: Sequelize.STRING,
  //   },
  //   userFamilyStatus: {
  //     type: Sequelize.STRING,
  //   },
  //   userHasChildren: {
  //     type: Sequelize.BOOLEAN,
  //   },
  //   userPayingStudentLoans: {
  //     type: Sequelize.BOOLEAN,
  //   },
  //   userAccounts: {
  //     type: Sequelize.INTEGER,
  //   },
  //   loginAmount: {
  //     type: Sequelize.INTEGER,
  //     defaultValue: 0,
  //   },
  //   isBeta: {
  //     type: Sequelize.BOOLEAN,
  //   },
  //   linkedAccounts: {
  //     type: Sequelize.INTEGER,
  //     defaultValue: 0,
  //   },
  //   isConnectedAccounts: {
  //     type: Sequelize.INTEGER,
  //   },
  //   yearlySalary: {
  //     type: Sequelize.FLOAT,
  //   },
  //   monthlySalary: {
  //     type: Sequelize.FLOAT,
  //   },
  // incomeStreams: {
  //   type: Sequelize.ARRAY(Sequelize.STRING)
  // },
  //   monthlyRent: {
  //     type: Sequelize.FLOAT,
  //   },
  //   resetPasswordCode: {
  //     type: Sequelize.STRING,
  //   },
  //   expire_timestamp: {
  //     type: Sequelize.DATE,
  //   },
  //   created_timestamp: {
  //     type: Sequelize.DATE,
  //   },
  //   verified: {
  //     type: Sequelize.BOOLEAN,
  //   },
  //   requesting_ip: {
  //     type: Sequelize.STRING,
  //   },
  //   pushToken: {
  //     type: Sequelize.STRING,
  //   },
  //   lastLogin: {
  //     type: Sequelize.DATE,
  //   },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

/**
 * hooks
 */

const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);