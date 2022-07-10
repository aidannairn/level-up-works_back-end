const dotenv = require('dotenv')

dotenv.config()

const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD
} = process.env

const getENV = type => {
  switch (type) {
    case 'database':
      return MYSQL_DATABASE
    case 'host':
      return MYSQL_HOST
    case 'port':
      return MYSQL_PORT
    case 'username':
      return MYSQL_USERNAME
    case 'password':
      return MYSQL_PASSWORD
    default:
    break;
  }
}

module.exports = { getENV }