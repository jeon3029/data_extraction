const express = require('express')
const app = express()
var body_parser = require('body-parser');
var cors = require('cors'); 
var path = require('path');

var query_router = require('./routes/query')
var home_router = require('./routes/home')
var result_router = require('./routes/result')
// CORS 설정
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname+'/routes/views/style'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(body_parser.json())

//test 용 출력

app.get('/test', (req, res) => {
  res.send('/test_output')
})

app.use('/',home_router)
//app.use('/',home_router)
app.use('/query',query_router)
app.use('/result',result_router)

// 404 handler
app.use(function(req, res, next) {
  res.status(404);
  res.type('txt').send('Not found');
  console.log('\n404 NOT FOUND\n')
});


module.exports = app;