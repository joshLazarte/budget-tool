/* eslint-disable no-console */
const express = require("express"),
  router = express.Router(),
  fs = require("fs"),
  pdf = require("html-pdf"),
  path = require("path"),
  ejs = require("ejs");

const compile = (template, data, css) => {
  const compiled = ejs.compile(fs.readFileSync(template, "utf8"));
  const html = compiled({ data, css });
  return html;
};

const getDataFromFile = file => {
  const data = fs.readFileSync(file, "utf8", (err, contents) => {
    if (err) throw err;
    return contents;
  });
  return data;
};

router.post("/", (req, res) => {
  const css = getDataFromFile("./public/css/style.css");
  const content = compile("./docs/template.ejs", req.body, css);
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
