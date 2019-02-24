const express   = require('express'),
      router    = express.Router(),
      puppeteer = require('puppeteer'),
      fs        = require('fs-extra');
      
// router.get('/', async (req,res) => {
//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.setContent('<h1>Hello</h1>');
//         await page.emulateMedia('screen');
//         await page.pdf({
//             path: 'budget.pdf',
//             format: 'A4',
//             printBackground: true
//         });
//         console.log('done');
//         await browser.close();
//     } catch (err) {
//         console.log(err);
//     }
// });   
      
module.exports = router;