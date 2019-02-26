/* eslint-disable no-console */
const express = require('express'),
      router  = express.Router(),
      fs      = require('fs');


router.get('/', (req,res) => {
    res.send('API Get Route')
});  

router.post('/', (req,res) => {        
    fs.writeFile('./db/data.json', JSON.stringify(req.body), (err) => {
        if(err) {
            console.log(err)
        }
    });
    res.send({"data": "received"})
        
}); 

module.exports = router;