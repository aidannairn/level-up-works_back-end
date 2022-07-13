const bcrypt = require('bcrypt')

const { dbConnection } = require('../config/mysql')
const { getENV } = require('../config/dotenv')

const dbName = getENV('database')

const signUpUser = (req, res) => {
  const { firstName, lastName, email, password, school, profilePic, dateOfBirth, contactNumber } = req.body

  if (!email) {
    return res.status(400).send('Missing parameter: email')
  }
  if (!password) {
    return res.status(400).send('Missing parameter: password')
  }

  
  try {
    const hashedPassword = bcrypt.hashSync(password, 10)
    //  Call an INSERT query into the DB
    dbConnection.query(
      `INSERT INTO ${dbName}.Teacher (FirstName, LastName, Email, Password, School, ProfilePic, DateOfBirth, ContactNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, hashedPassword, school, profilePic, dateOfBirth, contactNumber]
    )
    res.send(`Created a new User with the email: ${email}.`)
  } catch (error) {
    res.status(400).send(`Error creating the user. ${JSON.stringify(error?.message)}`)
  }
}

module.exports = { signUpUser }