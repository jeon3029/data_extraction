var express = require('express'); 
var app = express();
var config  = require('../config/config');
const oracledb = require('oracledb');

app.set('views',__dirname+'/views')
app.set('view engine','ejs')
app.engine('html', require('ejs').renderFile)

app.get('/', function(req, res, next) {
  var id = req.query.id;
  var query = req.query.query;
  
  console.log();
  console.log('USER : \"' + id+'\"');
  console.log('REQUEST : \"' + query+'\"');
  var t0 = new Date().getTime();
  //let temp = test_run();
  //res.end();
  oracledb.getConnection(
  {
    user          : config.oracle_id,
    password      : config.oracle_pw,
    connectString : config.oracle_connect_string  
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      query,
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          res.send(err.message)
          res.end()
          return;
        }
//        console.log(result.rows);
        var t1 = new Date().getTime();
//        res.json({time:t1-t0,head:result.metaData,row:result.rows})
        console.log('QUERY : \"' + query + '\" success!')
        console.log('TIME : '+ (t1-t0) + 'milliseconds.\n')
        doRelease(connection);
        console.log("DATA")
        console.log(result.metaData)
        console.log(result.rows)
        console.log("")
        res.render('result', { title: '데이터 추출 결과' ,id:id,query:query,
                              result_head:result.metaData,
                              result_row:result.rows});
      });
  });
});
function doRelease(connection) {
  connection.close(
    function(err) {
      if (err)
        console.error(err.message);
    });
}
 
module.exports = app;
