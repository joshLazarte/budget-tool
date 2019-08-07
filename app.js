require("dotenv").config();
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  sessionConfig = require("./config/session"),
  pdf = require("./routes/pdf");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(sessionConfig);

app.get("/", (req, res) => res.render("index"));
app.use("/pdf", pdf);

app.listen(process.env.PORT, process.env.IP, () =>
  console.log("server has started")
);
