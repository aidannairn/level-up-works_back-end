const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

const { dbConnection } = require('../config/mysql')
const { getENV } = require('../config/dotenv')

const dbName = getENV('database')

const signUpUser = (req, res) => {
  const { type, firstName, lastName, email, password } = req.body

  if (!firstName) return res.status(400).json({ type: 'error', msg: 'Missing parameter: First Name' })
  if (!lastName) return res.status(400).json({ type: 'error', msg: 'Missing parameter: Last Name' })
  if (!email) return res.status(400).json({ type: 'error', msg: 'Missing parameter: Email' })
  if (!password) return res.status(400).json({ type: 'error', msg: 'Missing parameter: Password' })
  
  try {
    const hashedPassword = bcrypt.hashSync(password, 10)

    const query = `
      INSERT INTO ${dbName}.${type} 
      (FirstName, LastName, Email, Password)
      VALUES (?, ?, ?, ?)
    `
    
    dbConnection.query(query, [firstName, lastName, email, hashedPassword] )
    res.json({type: 'success', msg: `Created a new User with the email: ${email}.`})
  } catch (error) {
    res.status(400).json({type: 'error', msg: `Error creating the user. ${JSON.stringify(error?.message)}`})
  }
}

const signUpCompleteUser = (req, res) => {
  const { type, teacherID, firstName, lastName, email, password, school, profilePic, dateOfBirth, contactNumber, course } = req.body

  if (!email) {
    return res.status(400).send('Missing parameter: email')
  }

  if (!password) {
    return res.status(400).send('Missing parameter: password')
  }
  
  try {
    const hashedPassword = bcrypt.hashSync(password, 10)
    // By default - Set table to Student
    let table = 'Student'

    const colsWithValues = [
      { TeacherID: teacherID },
      { FirstName: firstName },
      { LastName: lastName },
      { Email: email },
      { Password: hashedPassword },
      { School: school },
      { ProfilePic: profilePic },
      { DateOfBirth: dateOfBirth },
      { ContactNumber: contactNumber },
      { Course: course }
    ]
    // If type included in request and equal to "Teacher" - Remove unnecessary columns
    if (type === 'Teacher') {
      table = 'Teacher'
      colsWithValues.shift() // Remove first - "TeacherID"
      colsWithValues.pop() // Remove last - "Course"
    }

    const keysArr = colsWithValues.map(col => Object.keys(col)[0])
    const colsStr = keysArr.join(', ')
    
    // (?, ?, ? etc) - MySQL syntax for values to be 
    let valuesPlaceholder = colsWithValues.map(() => '?').join(', ')

    const valuesArr = colsWithValues.map(col => col[Object.keys(col)[0]])

    //  Call an INSERT query into the DB
    dbConnection.query(
      `INSERT INTO ${dbName}.${table} (${colsStr}) VALUES (${valuesPlaceholder})`,
      valuesArr
    )
    res.send(`Created a new User with the email: ${email}.`)
  } catch (error) {
    res.status(400).send(`Error creating the user. ${JSON.stringify(error?.message)}`)
  }
}

const loginUser = (req, res) => {
  const { type, email, password } = req.body

  if (!email) {
    return res.status(400).send('Missing parameter: email')
  }

  if (!password) {
    return res.status(400).send('Missing parameter: password')
  }

  dbConnection.query(`SELECT * FROM ${dbName}.${type} WHERE Email = ?`, [email], (error, result) => {
    if (error) {
      console.log('Error', error)
      res.send(`Error logging in the user. ${JSON.stringify(error?.message)}`)
    } else {
      if (!result.length) {
        return res.status(401).send('Cannot find user with the given email and password.')
      }
      const { Password: realPassword } = result[0] 

      const arePasswordsMatching = bcrypt.compareSync(password, realPassword) 

      if (!arePasswordsMatching) {
        return res.status(401).send('Cannot find user with the given email and password.')
      }

      const {
        StudentID: studentID,
        TeacherID: teacherID,
        FirstName: fName,
        LastName: lName,
        ProfilePic: profilePic,
        DateOfBirth: dob,
        ContactNumber: contactNum,
        Email: email,
        School: school,
        Course: course
      } = result[0]

      let userID = studentID
      if (type === 'Teacher') userID = teacherID

      const accessToken = jwt.sign({ type, studentID, teacherID, fName, lName, profilePic, dob, contactNum, email, school, course }, getENV('accessToken'), {
        expiresIn: '15s'
      })

      const refreshToken = jwt.sign({ type, studentID, teacherID, fName, lName, profilePic, dob, contactNum, email, school, course }, getENV('refreshToken'), {
        expiresIn: '1d'
      })

      dbConnection.query(`UPDATE ${dbName}.${type} SET RefreshToken = "${refreshToken}" WHERE ${type}ID = "${userID}"`)

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      })

      res.status(200).json({ accessToken })
    }
  })
}

const logoutUser = (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if(!refreshToken) return res.sendStatus(204)

  const { type } = jwtDecode(refreshToken)

  dbConnection.query(`SELECT ${type}ID FROM ${dbName}.${type} WHERE RefreshToken = ?`, [refreshToken], (error, result) => {
    if (error) {
      console.log('Error:', error)
      res.send(`Error logging out the user. ${JSON.stringify(error?.message)}`)
    } else {
      if (!result[0]) return res.sendStatus(204)
    
      const userID = result[0][type + 'ID']
    
      dbConnection.query(`UPDATE ${type} SET RefreshToken = null WHERE ${type}ID = "${userID}"`)
    
      res.clearCookie('refreshToken')
      return res.sendStatus(200)
    }
  })
}

module.exports = {
  signUpUser,
  loginUser,
  logoutUser
}