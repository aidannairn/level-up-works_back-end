const mysql = require('mysql2')

const { getENV } = require('./dotenv')

const dbConfig = {
  host: getENV('host'),
  user: getENV('username'),
  password: getENV('password'),
  database: getENV('database'),
}

const dbConnection = mysql.createConnection(dbConfig)

module.exports = { dbConnection  }