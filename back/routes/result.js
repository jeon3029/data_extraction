var express = require('express'); 
var app = express();

app.set('views',__dirname+'/views')
app.set('view engine','ejs')
app.engine('html', require('ejs').renderFile)

app.get('/', function(req, res, next) {
  var id = req.query.id;
  var query = req.query.query;
  res.render('result', { title: '데이터 추출 결과' ,id:id,query:query});
});
 
 
module.exports = app;
