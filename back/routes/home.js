var express = require('express'); 
var app = express();

app.set('views',__dirname+'/views')
app.set('view engine','ejs')
app.engine('html', require('ejs').renderFile)

app.get('/', function(req, res, next) {
    res.render('home', { title: '데이터 추출' });
});
 
 
module.exports = app;
