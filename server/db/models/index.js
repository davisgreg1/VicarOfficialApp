const User = require("./user");
const Vehicle = require("./vehicle");
const VehicleService = require("./VehicleService");
// const Item = require('./item');
// const Budget = require('./budget');
// const Goal = require('./goal');
// const CreditCard = require('./creditCard');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Vehicle, {
  foreignKey: "id",
  onDelete: "cascade",
  hooks: true,
});
Vehicle.belongsTo(User);

Vehicle.hasMany(VehicleService, {
  foreignKey: "id",
  onDelete: "cascade",
  hooks: true,
});
VehicleService.belongsTo(Vehicle);

// User.hasMany(Account);
// Account.belongsTo(User);

// Item.hasMany(Account);
// Account.belongsTo(Item);

// User.hasMany(CreditCard);
// CreditCard.belongsTo(User);

// User.hasMany(Transaction);
// Transaction.belongsTo(User);

// User.hasMany(Budget);
// Budget.belongsTo(User);

module.exports = {
  User,
  Vehicle,
  VehicleService,
  //   Item,
  //   Budget,
  //   Goal,
  //   CreditCard
};
