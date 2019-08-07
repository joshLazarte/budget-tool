const session = require("express-session"),
  MongoStore = require("connect-mongo")(session);

module.exports = session({
  secret: process.env.SESSIONSECRET,
  resave: true,
  store: new MongoStore({
    url: "mongodb://localhost/budgetSession",
    ttl: 24 * 60 * 60,
    autoRemove: "native"
  }),
  saveUninitialized: true
});
