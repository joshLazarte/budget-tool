/* eslint-disable no-console */
const express = require('express'),
      router  = express.Router();

router.get('/', (req,res) => {
    res.send('API Get Route');
});  

module.exports = router;