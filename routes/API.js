/* eslint-disable no-console */
const express = require('express'),
      router  = express.Router(),
      fs      = require('fs'),
      ejs     = require('ejs');


router.get('/', (req,res) => {
    res.send('API Get Route')
});  

router.post('/', (req,res) => {    
    const data = req.body;
    const compiled = ejs.compile(fs.readFileSync('./views/template.ejs', 'utf8'));
    const html = compiled({data});
    console.log(html);


    res.send({"data": "received"})        
}); 

module.exports = router;