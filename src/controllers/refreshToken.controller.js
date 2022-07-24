const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

const { getENV } = require('../config/dotenv')
const { dbConnection } = require('../config/mysql')
const { fillUserQuery } = require('../utils/fillUserQuery')

const refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.sendStatus(401)

    const { type } = jwtDecode(refreshToken)

    dbConnection.query(`SELECT ${fillUserQuery(type)} FROM ${getENV('database')}.${type} WHERE RefreshToken = "${refreshToken}"`, (error, result) => {
      if (error) {
        console.log('Error:', error)
      } else {
        if (!result[0]) {
          console.log(error)
          return res.sendStatus(403)
        }

        jwt.verify(refreshToken, getENV('refreshToken'), (err, decoded) => {
          if (err) {
            console.log(err)
            return res.sendStatus(403)
          }

          const {
            studentID,
            teacherID,
            firstName,
            lastName,
            profilePic,
            dateOfBirth,
            contactNum,
            email,
            school,
            course
          } = result[0]

          const accessToken = jwt.sign({ type, studentID, teacherID, firstName, lastName, profilePic, dateOfBirth, contactNum, email, school, course }, getENV('accessToken'), {
            expiresIn: '15s'
          })
          res.json({ accessToken })
        })
      }
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

module.exports = { refreshToken }