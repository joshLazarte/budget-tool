/* eslint-disable no-console */
const express = require('express'),
      router  = express.Router(),
      fs      = require('fs'),
      puppeteer = require('puppeteer'),
      ejs     = require('ejs');


router.get('/', (req,res) => {
    res.send('API Get Route')
});  

const compile = function(template, data){
    const compiled = ejs.compile(fs.readFileSync(template, 'utf8'));
    const html = compiled({data});
    return html;
}

router.post('/', async (req,res) => {   
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const content = compile('./views/template.ejs', req.body);

    await page.setContent(content);
    await page.emulateMedia('screen');
    await page.pdf({
        path: 'budget.pdf',
        format: 'A4',
        printBackground: true
    });

    console.log('done');
    await browser.close();
    process.exit();
    res.send({"data": "received"})        
}); 

module.exports = router;