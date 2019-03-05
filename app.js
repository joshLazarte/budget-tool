//MODULES
require('dotenv').config();
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      session    = require('express-session'),
      MongoStore = require('connect-mongo')(session),
//ROUTE DEFS      
      pdf        = require('./routes/pdf'),
      API        = require('./routes/API');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());    
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: process.env.SESSIONSECRET,
  resave: true,
  store: new MongoStore({
      url: 'mongodb://localhost/budgetSession',
      ttl: 24 * 60 * 60,
      autoRemove: 'native'
  }),
  saveUninitialized: true
}));

//ROUTES
app.get('/', (req, res) => res.render('index'));
app.use('/pdf', pdf);
app.use('/API', API);

//INIT SERVER
app.listen(process.env.PORT, process.env.IP, () => console.log('server has started'));