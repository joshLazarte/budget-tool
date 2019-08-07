const fs = require("fs"),
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

module.exports = {
  getZoomLevel,
  compile,
  getDataFromFile
};
