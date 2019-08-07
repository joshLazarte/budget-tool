/* eslint-disable no-console */
const express = require("express"),
  router = express.Router(),
  fs = require("fs"),
  pdf = require("html-pdf"),
  ejs = require("ejs");

const getZoomLevel = () => {
  return process.env.OS === "Windows_NT" ? 1.75 : 0.5;
};

const compile = (template, data, css, zoom) => {
  const compiled = ejs.compile(fs.readFileSync(template, "utf8"));
  return compiled({ data, css, zoom });
};

const getDataFromFile = file => {
  return fs.readFileSync(file, "utf8", (err, contents) => {
    if (err) throw err;
    return contents;
  });
};

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
  res.download(file, err => {
    if (err) return console.log(err);
    fs.unlinkSync(file);
  });
});

module.exports = router;
