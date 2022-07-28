const router = require("express").Router();
const User = require("../db/models/user");

module.exports = router;

router.post("/signup", async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    console.log(
      "GREG LOOK!  ~ file: users.js ~ line 9 ~ router.post ~ user",
      user,
    );
    res.json({user: user})
    //   req.logIn(user, (err) =>
    //     err ? next(err) : res.json({ user: user, message: "Welcome!" })
    //   );
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(403).send("Ahoy Captain! This matee already exists.");
    } else {
      next(err);
    }
  }
});
