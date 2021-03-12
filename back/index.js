const express = require('express')
const app = express()
var body_parser = require('body-parser');
var cors = require('cors'); 
var path = require('path');

var query_router = require('./routes/query')
var index_router = require('./routes/index')
// CORS 설정
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(body_parser.json())

//test 용 출력
app.get('/test', (req, res) => {
  res.send('/test_output')
})

app.use('/',index_router)
app.use('/query',query_router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});


module.exports = app;