const oracledb = require('oracledb');
var express = require('express');
var app = express.Router();
var config  = require('../config/config');


app.post('/',function(req,res){
  console.log();
  console.log('USER : \"' + req.body['user']+'\"');
  console.log('REQUEST : \"' + req.body['query']+'\"');
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
      req.body['query'],
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
        res.json({head:result.metaData,row:result.rows,time:t1-t0})
        console.log('QUERY : \"' + req.body['query'] + '\" success!')
        console.log('TIME : '+ (t1-t0) + 'milliseconds.\n')
        doRelease(connection);
        res.end();
      });
  });
})


function doRelease(connection) {
  connection.close(
    function(err) {
      if (err)
        console.error(err.message);
    });
}

module.exports = app;