/* eslint-disable no-console */
const express = require('express'),
      router  = express.Router(),
      fs      = require('fs'),
      puppeteer = require('puppeteer'),
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

router.post('/', async (req,res) => {   
    const browser = await puppeteer.launch();
    const page = await browser.newPage(); 

    const css = getDataFromFile('./public/css/style.css'); 

    const content = compile('./docs/template.ejs', req.body, css);   

    await page.setContent(content);
    await page.emulateMedia('screen');    
    await page.pdf({
        path: './docs/budget.pdf',
        format: 'A4',
        printBackground: true
    });

    console.log('done');
    await browser.close();           
}); 

module.exports = router;