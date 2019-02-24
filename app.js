const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser');
     
app.use(bodyParser.urlencoded({extended: true}));     
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('index'));

const download = require('./routes/download');
app.use('/download', download);

app.listen(process.env.PORT, process.env.IP, () => console.log('server has started'));