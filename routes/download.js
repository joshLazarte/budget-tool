const express   = require('express'),
      router    = express.Router(),     
      path      = require('path');
      
router.get('/', (req,res) => {
    const file = path.join('./docs', 'budget.pdf');
    res.download(file, (err) => {
        if(err) {
            console.log(err);           
        }
    });
});   
      
module.exports = router;