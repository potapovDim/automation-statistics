const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'my-secret-pw',
  database: 'my_db'
});

