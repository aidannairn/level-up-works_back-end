const bcrypt = require('bcrypt')

const { dbConnection } = require('../config/mysql')
const { getENV } = require('../config/dotenv')

const dbName = getENV('database')

const signUpUser = (req, res) => {
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

  dbConnection.query(`SELECT Password FROM ${dbName}.${type} WHERE Email = "${email}"`, (error, result) => {
    if (error) {
      console.log('Error', error)
      res.send(`Error logging in the user. ${JSON.stringify(error?.message)}`)
    } else {
      if (result.length === 0) {
        return res.status(400).send('Cannot find a user with the given email')
      }
      const { Password: realPassword } = result[0] // realPassword contains the one from the DB
      // checking password from the API call with the one from the DB
      const arePasswordsMatching = bcrypt.compareSync(password, realPassword) 
      const responseMessage = arePasswordsMatching
        ? `Logged in user with email: ${email}`
        : 'Login failed. Please check your password'
      const responseStatus = arePasswordsMatching ? 200 : 401
      res.status(responseStatus).send(responseMessage)
    }
  })
}

module.exports = {
  signUpUser,
  loginUser
}