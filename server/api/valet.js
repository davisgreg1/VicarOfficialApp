const router = require("express").Router();
var jwt = require("jsonwebtoken");
const User = require("../db/models/user");
const Valet = require("../db/models/valet");
const Vehicle = require("../db/models/vehicle");
const VehicleService = require("../db/models/vehicleService");
const config = require("../config/auth.config");

module.exports = router;

router.get("/getAllVehiclesById/", async (req, res, next) => {
  const userId = req.query.id;
  try {
    let vehicles = await Vehicle.findAll({
      where: {
        userId: userId,
      },
    });
    return res.json({ message: "Got all vehicles by id!", vehicles: vehicles });
  } catch (err) {
    next(err);
  }
});

router.get("/test", async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({
      message: "no token provided",
    });
  }
  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "session expired, please login again",
        userAuthenticated: false,
      });
    }
    req.user.id = decoded.id;

    const vehicles = await Vehicle.findAll({
      where: {
        userId: req.user.id,
      },
    });
    const data = [req.user, ...vehicles];

    res.status(200).json({ user: data, userAuthenticated: true });
    next();
  });
});

router.patch("/editProfile", async (req, res, next) => {
  const user = req.user;
  const userId = user.id;
  if (!user) {
    res.status(404).send("No user found");
  }

  try {
    let user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const newEmail = req.body.email || user.email;
    const newFirstName = req.body.firstName || user.firstName;
    const newLastname = req.body.lastName || user.lastName;
    const newPhoneNumber = req.body.phoneNumber || user.phoneNumber;

    let updatedUser = await user.update(
      {
        email: newEmail,
        firstName: newFirstName,
        lastName: newLastname,
        phoneNumber: newPhoneNumber,
      },
      { where: { id: userId } },
    );
    return res.json({
      message: "User Updated Successfully!",
      updatedUser: updatedUser,
    });
  } catch (err) {
    next(err);
  }
});
