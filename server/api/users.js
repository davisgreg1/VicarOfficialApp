const router = require("express").Router();
const User = require("../db/models/user");
const Vehicle = require("../db/models/vehicle");

module.exports = router;

router.post("/addVehicle", async (req, res, next) => {
  const user = req.user;
  const { year, make, model, color, type, nickName, isCarParked } = req.body;
  try {
    const userID = user.id;
    if (!Boolean(user)) return res.json({ message: "No User Found" });
    req.body.id = userID;

    await Vehicle.create({
      year,
      make,
      model,
      color,
      type,
      nickName,
      userId: userID,
      isCarParked: isCarParked
    });
    const vehicles = await Vehicle.findAll({
      where: {
        userId: userID,
      },
    });
    if (!Boolean(vehicles)) return res.json({ vehicles: [] });
    return res.json({ vehicles: vehicles });
  } catch (err) {
    if (err) {
      res.status(403).send({ error: err });
      console.error('GREG LOOK!  ~ file: users.js ~ line 36 ~ router.post ~ err', err);
    } else {
      next(err);
    }
  }
});

// router.patch("/editVehicle/:id", async (req, res, next) => {
//   try {
//     let user = await User.create(req.body);
//     req.logIn(user, (err) =>
//       err ? next(err) : res.json({ user: user, userAuthenticated: true }),
//     );
//   } catch (err) {
//     if (err.name === "SequelizeUniqueConstraintError") {
//       res.status(403).send("User already exists.");
//     } else {
//       next(err);
//     }
//   }
// });

// router.patch("/removeVehicle/:id", async (req, res, next) => {
//   try {
//     let user = await User.create(req.body);
//     req.logIn(user, (err) =>
//       err ? next(err) : res.json({ user: user, userAuthenticated: true }),
//     );
//   } catch (err) {
//     if (err.name === "SequelizeUniqueConstraintError") {
//       res.status(403).send("User already exists.");
//     } else {
//       next(err);
//     }
//   }
// });
