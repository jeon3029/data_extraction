const express = require('express')
const app = express()


var config  = require('./config/config');
const port = config.server_port;

const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : config.db_host,
  user     : config.db_id,
  password : config.db_passwd,
  database : config.db_schema
});

const oracledb = require('oracledb');
async function test_run() {
  let connection;
  try{
    connection = await oracledb.getConnection(
  {
    user          : config.oracle_id,
    password      : config.oracle_pw,
    connectString : config.oracle_connect_string
  });
  const result = await connection.execute(
      `SELECT manager_id, department_id, department_name
       FROM departments`,
  );
  console.log(result.rows);
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
}
test_run();


app.get('/', (req, res) => {
  console.log("time started")
  setTimeout(response_func,5000,res);
})
function response_func(res){
  
  //connection.connect()
  connection.query('SELECT * from student', (error, rows, fields) => {
    if (error) throw error;
    console.log('student info is: ', rows);
  });
  res.send('test')
  
  //connection.end()
  console.log("time finished")
}
app.listen(port, () => {
  console.log(`서버 실행중... http://localhost:${port}`)
})