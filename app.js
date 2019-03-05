//MODULES
require('dotenv').config();
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
//ROUTE DEFS      
      pdf        = require('./routes/pdf'),
      API        = require('./routes/API');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());    
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//ROUTES
app.get('/', (req, res) => res.render('index'));
app.use('/pdf', pdf);
app.use('/API', API);

//INIT SERVER
app.listen(process.env.PORT, process.env.IP, () => console.log('server has started'));