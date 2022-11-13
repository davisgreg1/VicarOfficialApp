require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const compression = require("compression");
const passport = require("passport");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./db");
const User = require("./db/models/user");
const sessionStore = new SequelizeStore({ db });
const indexRouter = require("./routes/index");
const usersRouter = require("./api/users");
const authRouter = require("./api/auth");
const valetRouter = require("./api/valet");
const PORT = process.env.PORT || "5000";

const app = express();
app.set("port", PORT);

// for push notification const moment = require('moment'); const { findOstrich }
// = require('./userlookUp'); const Expo = require('expo-server-sdk'); const
// expo = new Expo(); node-schedule const schedule = require('node-schedule');

module.exports = app;

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
// if (process.env.NODE_ENV !== 'production') require('../secrets');

const createApp = () => {
// headers
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});


  // logging middleware
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  // cors
  app.use(cors());

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "this is my SeCret",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // auth and api routes
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/auth", authRouter);
  app.use("/valet", valetRouter);

  // passport registration
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) =>
    User.findByPk(id)
      .then((user) => done(null, user))
      .catch(done),
  );

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Path Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`
    
    🚀 Taking off on port: ${PORT} 🚀`),
  );
};

// const dbForce = false;
// const syncDb = () => db.sync({ force: dbForce });
// .then(async (eraseDatabaseOnSync) => {
//   if (eraseDatabaseOnSync) {
//     // for now toggle `eraseDatabaseOnSync` in order to clear the db when killing the backend and restarting it.
//     const eraseDatabaseOnSync = true;
//     // const eraseDatabaseOnSync = true;
//     await seed(eraseDatabaseOnSync);
//   }
// });
// ------------------------------ node-schedule
// ----------------------------------- Schedule to run everyday at midnight
// const taskSchedule = new schedule.RecurrenceRule(); taskSchedule.hour = 24;
// taskSchedule.dayOfWeek = new schedule.Range(0, 6); For Testing - Job runs
// every minute & will send notification to ostric users who havnt logged in for
// a day taskSchedule.second = 0; function reportOnSchedule() {   let messages
// = [];   (async () => {     console.log('made it into reportOnSchedule
// ========================================')     let ostrichArr = await
// findOstrich();     for (let i = 0; i < ostrichArr.length; i++) {       //
// check whether pushToken is valid       if
// (!Expo.isExpoPushToken(ostrichArr[i].pushToken)) {         console.error(
//   `Push token ${ostrichArr[i].pushToken} is not a valid Expo push token`
//   );         continue;       }       // check if notification needs to be
// sent based on lastLogin & interval       let userLastLogin =
// ostrichArr[i].lastLogin;       let currentDate = moment().toDate();       let
// difference = currentDate - userLastLogin;       let interval =
// ostrichArr[i].reminderInterval       if (interval > 0 && difference >
// interval) {         // construct message         messages.push({ to:
// ostrichArr[i].pushToken,           sound: 'default',           title: 'Money
// Mentor',           body: `Hey! It's time to check-in!`, data: { withSome:
// 'data' },         });       }     }     // batch up notifications to reduce
// number of requests     let chunks = expo.chunkPushNotifications(messages);
//  for (let chunk of chunks) { try {         let receipts = await
// expo.sendPushNotificationsAsync(chunk);      console.log(receipts);       }
// catch (error) { console.error(error);       }     }   })(); }
// schedule.scheduleJob(taskSchedule, () => reportOnSchedule());
// console.log('The schdule has been initialzed'); This evaluates as true when
// this file is run directly from the command line, i.e. when we say 'node
// server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc) It
// will evaluate false when this module is required by another module - for
// example, if we wanted to require our app in a test spec
if (require.main === module) {
  sessionStore.sync().then(createApp).then(startListening);
} else {
  createApp();
}
