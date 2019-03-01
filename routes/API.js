/* eslint-disable no-console */
const express = require('express'),
      router  = express.Router(),
      fs      = require('fs'),
      //path    = require('path'),
      //puppeteer = require('puppeteer'),
      pdf     = require('html-pdf'),
      ejs     = require('ejs');


router.get('/', (req,res) => {
    res.send('API Get Route')
});  

const compile = function(template, data, css){
    const compiled = ejs.compile(fs.readFileSync(template, 'utf8'));
    const html = compiled({data, css});
    return html;
}

const getDataFromFile = function(file) {    
   const data = fs.readFileSync(file, 'utf8', (err, contents) => {
            if(err) throw err;
            return contents;
        });
    return data;
}

router.post('/', async (req, res) => {      
    const css = getDataFromFile('./public/css/style.css'); 
    const content = compile('./docs/template.ejs', req.body, css);     
    const options = {format: 'Letter'};

    await pdf.create(content, options).toFile('./docs/budget.pdf', (err, res) => {
        if (err) return console.log(err);
        console.log(res); 
    });       
}); 

module.exports = router;