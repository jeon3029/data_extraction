const express = require('express')
const app = express()
var body_parser = require('body-parser');
var cors = require('cors'); 

var config  = require('./config/config');
const port = config.server_port;

//const mysql      = require('mysql');
//const connection = mysql.createConnection({
//  host     : config.db_host,
//  user     : config.db_id,
//  password : config.db_passwd,
//  database : config.db_schema
//});


const oracledb = require('oracledb');
async function test_run() {
  let connection;
  var result;
  try{
    connection = await oracledb.getConnection(
    {
      user          : config.oracle_id,
      password      : config.oracle_pw,
      connectString : config.oracle_connect_string
    });
    result = await connection.execute(
        `SELECT manager_id, department_id, department_name
         FROM departments`,
    );
//    console.log(result.rows);
  }
  catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
//  console.log(result);
  console.log(result.rows[0])
  return result.rows[0]
}

//body-parser
app.use(body_parser.json())

// CORS 설정
app.use(cors());

//test 용 출력
app.get('/', (req, res) => {
  res.send('/test_output')
})

app.post('/query',function(req,res){
  console.log(req.body['query']);
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
          return;
        }
        console.log(result.rows);
        res.json({head:result.metaData,row:result.rows})
        doRelease(connection);
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
app.listen(port, () => {
  console.log(`서버 실행중... http://localhost:${port}`)
})