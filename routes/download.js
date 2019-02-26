const express   = require('express'),
      router    = express.Router(),
      puppeteer = require('puppeteer'),
      fs        = require('fs-extra');
      
router.get('/', async (req,res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:8000/', {waitUntil: 'networkidle2'});
        await page.emulateMedia('screen');
        await page.pdf({
            path: 'budget.pdf', 
            format: 'A4',
            printBackground: true
        });
      
        await browser.close();

        res.send('Document Written!');
    } catch (err) {
        console.log(err);
    }
});   
      
module.exports = router;