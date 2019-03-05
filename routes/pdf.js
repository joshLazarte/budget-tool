/* eslint-disable no-console */
const express = require('express'),
      router  = express.Router(),
      fs      = require('fs'),      
      pdf     = require('html-pdf'),
      path      = require('path'),
      ejs     = require('ejs');

const compile = (template, data, css) => {
    const compiled = ejs.compile(fs.readFileSync(template, 'utf8'));
    const html = compiled({data, css});
    return html;
}

const getDataFromFile = (file) => {    
   const data = fs.readFileSync(file, 'utf8', (err, contents) => {
            if(err) throw err;
            return contents;
        });
    return data;
}

router.post('/', (req, res) => {      
    const css = getDataFromFile('./public/css/style.css'); 
    const content = compile('./docs/template.ejs', req.body, css);     
    const options = {format: 'Letter'};

    pdf.create(content, options).toFile('./docs/budget.pdf', (err, pdf) => {
        if (err) return console.log(err);
        console.log(pdf);
        res.send({"status": "success"}); 
    }); 
}); 

router.get('/download', (req,res) => {
    const file = path.join('./docs', 'budget.pdf');
    console.log('download route');
    res.download(file, (err) => {
        if(err) {
            console.log(err);           
        }
    });
});  
      
module.exports = router;