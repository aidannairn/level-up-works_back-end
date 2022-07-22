const jwt = require('jsonwebtoken')
const { getENV } = require('../config/dotenv')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, getENV('accessToken'), (err, decoded) => {
    if (err) return res.sendStatus(403)
    
    req.email = decoded.email
    next()
  })
}

module.exports = { verifyToken }