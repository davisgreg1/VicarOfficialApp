require("dotenv").config();
const router = require("express").Router();
const User = require("../db/models/user");
const Vehicle = require("../db/models/vehicle");
const VehicleService = require("../db/models/vehicleService");
// const crypto = require("crypto");
// const seedrandom = require("seedrandom");
// const moment = require("moment");
// const nodemailer = require("nodemailer");
// const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
// const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID;
// const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
// const GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
// const GMAIL_REDIRECT_URL = process.env.GMAIL_REDIRECT_URL;
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(
//   GMAIL_CLIENT_ID,
//   GMAIL_CLIENT_SECRET,
//   GMAIL_REDIRECT_URL,
// );

// oauth2Client.setCredentials({
//   refresh_token: GMAIL_REFRESH_TOKEN,
// });

// const accessToken = oauth2Client.getAccessToken();

// const rng = seedrandom(crypto.randomBytes(64).toString("base64"), {
//   entropy: true,
// });

module.exports = router;

router.post("/signup", async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    req.logIn(user, (err) =>
      err ? next(err) : res.json({ user: user, userAuthenticated: true }),
    );
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(403).send("User already exists.");
    } else {
      next(err);
    }
  }
});

router.post("/login", (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(async (user) => {
      if (!user) {
        res.status(401).json({
          message: "No user found.",
          userAuthenticated: false,
        });
      } else if (!user.correctPassword(req.body.password)) {
        res.status(403).json({
          message: "Wrong email and/or password",
          userAuthenticated: false,
        });
      } else {
        const vehicles = await Vehicle.findAll({
          where: {
            userId: user.id,
          },
        });
        const data = [user, ...vehicles];
        req.logIn(user, (err) =>
          err ? next(err) : res.json({ user: data, userAuthenticated: true }),
        );
      }
    })
    .catch(next);
});

router.post("/logout", async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  req.session.destroy(function (err, next) {
    if (err) {
      return next(err);
    }
  });
  res.json({
    userAuthenticated: false,
    message: "User successfully logged out",
  });
});

router.post("/deleteAccount", async (req, res, next) => {
  const user = req.user;
  const userID = user.id;
  try {

    await VehicleService.destroy({
      where: {
        userId: userID,
      },
      paranoid: false,
      cascade: true,
    });

    await Vehicle.destroy({
      where: {
        userId: userID,
      },
      paranoid: false,
      cascade: true,
    });

    await User.destroy({
      where: {
        id: userID,
      },
      paranoid: false,
      cascade: true,
    });
    
    req.session.destroy(function (err, next) {
      if (err) {
        return next(err);
      }
    });

    res.json({
      userAuthenticated: false,
      message: "Account successfully deleted",
    });
  } catch (error) {
    next(error);
  }
});

// router.patch("/updatePW", (req, res, next) => {
//   User.findOne({ where: { email: req.body.email } })
//     .then((user) => {
//       if (!user) {
//         res.status(401).send("No Email found.");
//       } else {
//         user.update({ password: req.body.password });
//         res.status(200).send("Password successfully Updated");
//       }
//     })
//     .catch(next);
// });

// router.patch("/reset_password", async (req, res, next) => {
//   const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
//   const code = rng().toString().substring(3, 9);

//   await User.findOne({ where: { email: req.body.email } })
//     .then(async (user) => {
//       if (!user) {
//         res.status(401).json({
//           status: 401,
//           message: "Yikes! Try another email.",
//         });
//       } else {
//         const userEmail = user.dataValues.email;
//         const userFirstName = user.dataValues.firstName;
//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             type: "OAuth2",
//             user: GMAIL_EMAIL,
//             clientId: GMAIL_CLIENT_ID,
//             clientSecret: GMAIL_CLIENT_SECRET,
//             refreshToken: GMAIL_REFRESH_TOKEN,
//             accessToken: accessToken,
//           },
//         });

//         const mailOptions = {
//           from: GMAIL_EMAIL, // sender address
//           to: [userEmail], // list of receivers
//           subject: `Your MoneyCaptain Verification Code`, // Subject line
//           html: `
//            <h1> Hey ${userFirstName},</h1>
//            <p>We noticed you're trying to reset your MoneyCaptain password! Please enter this code:</p>
//             <h1>${code}</h1>
//             <p>to finish resetting your password.</p>
//           `,
//         };
//         transporter.sendMail(mailOptions, function (err, info) {
//           if (err) {
//             console.log("Error Sending Email:", err);
//           } else {
//             console.log("email info:", info);
//           }
//           transporter.close();
//         });
//         await user.update({
//           resetPasswordCode: code,
//           requesting_ip: ip,
//           expire_timestamp: moment().add(10, "minutes").unix(),
//           created_timestamp: moment().unix(),
//           verified: false,
//         });
//         res.status(200).json({
//           status: 200,
//           message: "Verification code sent",
//           resendLink: false,
//         });
//       }
//     })
//     .catch(next);
// });

// router.patch("/confirm_reset_password_code", (req, res, next) => {
//   const secureCode = req && req.body && req.body.code;
//   User.findOne({ where: { email: req.body.email } })
//     .then((user) => {
//       const now = moment().unix();
//       const expiredTime = moment(user.dataValues.expire_timestamp);
//       if (!user) {
//         res.status(401).json({
//           status: 401,
//           message: "Yikes! No email found",
//         });
//       } else if (now > expiredTime) {
//         res.status(400).json({
//           status: 400,
//           message: "Yikes! Verification code expired",
//           resendLink: true,
//         });
//       } else if (secureCode !== user.dataValues.resetPasswordCode) {
//         res.status(401).json({
//           status: 401,
//           message: "Yikes! Invalid verification code",
//         });
//       } else {
//         user.update({
//           resetPasswordCode: null,
//           requesting_ip: null,
//           expire_timestamp: null,
//           created_timestamp: null,
//           verified: true,
//         });
//         return res.status(200).json({
//           status: 200,
//           message: "Success! Verification code confirmed",
//           resendLink: false,
//         });
//       }
//     })
//     .catch(next);
// });

// router.get("/me", (req, res) => {
//     req.user ? res.json(req.user) : res.send("No User Available");
//   });
