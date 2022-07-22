const jwt = require('jsonwebtoken')
const { getENV } = require('../config/dotenv')
const { dbConnection } = require('../config/mysql')

const refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.sendStatus(401)

    dbConnection.query(`SELECT studentID, teacherID, FirstName, LastName, email, school, profilePic, DateOfBirth, ContactNumber, course FROM ${getENV('database')}.Student WHERE RefreshToken = "${refreshToken}"`, (error, result) => {
      if (error) {
        console.log('Error:', error)
      } else {
        if (!result[0]) return res.sendStatus(403)

        jwt.verify(refreshToken, getENV('refreshToken'), (err, decoded) => {
          if (err) return res.sendStatus(403)

          const {
            studentID,
            teacherID,
            FirstName: fName,
            LastName: lName,
            profilePic,
            DateOfBirth: dob,
            ContactNumber: contactNum,
            email,
            school,
            course
          } = result[0]

          const accessToken = jwt.sign({ studentID, teacherID, fName, lName, profilePic, dob, contactNum, email, school, course }, getENV('accessToken'), {
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