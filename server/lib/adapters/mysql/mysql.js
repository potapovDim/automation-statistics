const mysql = require('mysql');
const {
  host = '127.0.0.1',
  user = 'automation',
  password = 'automation',
  database = 'automation_statistics'
} = process.env;

const connectedDb = mysql.createConnection({
  host,
  user,
  password,
  database
});


module.exports = {
  connectedDb
};
