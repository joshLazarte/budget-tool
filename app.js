const express    = require('express'),
      app        = express(),
      axios      = require("axios"),
      bodyParser = require('body-parser');
     
app.use(bodyParser.urlencoded({extended: true}));     
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    const url = "https://j3l-webdesign-lazarte.c9users.io:8081/months";
    getData(url).then((data) => {
        res.render('dashboard', {months: data});
    });
}); 

app.get('/new', (req,res) => res.render('index'));

app.get('/months/:id', (req,res) => {
    const id = req.params.id;
    const url = `https://j3l-webdesign-lazarte.c9users.io:8081/months/${id}`;
    getData(url).then((data) => {
        res.render('month-view', {data: data});
    });
});

app.listen(process.env.PORT, process.env.IP, () => console.log('server has started'));


const getData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};