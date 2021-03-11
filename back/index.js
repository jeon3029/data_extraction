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