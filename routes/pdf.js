/* eslint-disable no-console */
const express = require("express"),
  router = express.Router(),
  fs = require("fs"),
  pdf = require("html-pdf"),
  { getZoomLevel, compile, getDataFromFile } = require("../utils/pdf");

router.post("/", (req, res) => {
  const zoom = getZoomLevel();
  const css = getDataFromFile("./public/css/style.css");
  const content = compile("./docs/template.ejs", req.body, css, zoom);
  const options = { format: "Letter" };
  const fileName = `./docs/${Date.now()}-budget.pdf`;

  req.session.fileName = fileName;

  pdf.create(content, options).toFile(fileName, (err, pdf) => {
    if (err) return console.log(err);
    res.send({ status: "success" });
  });
});

router.delete("/delete", (req, res) => {
  const file = req.session.fileName;
  req.session.fileName = undefined;
  if (file !== undefined && fs.existsSync(file)) {
    fs.unlinkSync(file);
    res.send({ action: "file deleted" });
  }
});

router.get("/download", (req, res) => {
  const file = req.session.fileName;
  req.session.fileName = undefined;
  res.download(file, "Budget Data.pdf", err => {
    if (err) return console.log(err);
    fs.unlinkSync(file);
  });
});

module.exports = router;
