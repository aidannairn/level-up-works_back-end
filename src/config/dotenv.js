const dotenv = require('dotenv')

dotenv.config()

const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  CORS_ORIGIN
} = process.env

const getENV = type => {
  switch (type) {
    case 'database': return MYSQL_DATABASE
    case 'host': return MYSQL_HOST
    case 'port': return MYSQL_PORT
    case 'username': return MYSQL_USERNAME
    case 'password': return MYSQL_PASSWORD
    case 'accessToken': return ACCESS_TOKEN_SECRET
    case 'refreshToken': return REFRESH_TOKEN_SECRET
    case 'corsOrigin': return CORS_ORIGIN
    default:
    break;
  }
}

module.exports = { getENV }