const mysql = require('mysql2')

const { getENV } = require('./dotenv')

const dbConfig = {
  host: getENV('host'),
  user: getENV('username'),
  password: getENV('password'),
  database: getENV('database'),
}

const dbConnection = mysql.createConnection(dbConfig)

const dbHandleDisconnect = () => {
  console.log('Disconnected from database...')
  dbConnection.connect((err) => {              
    if(err) {
      console.log('Error when connecting to database:', err)
      setTimeout(dbHandleDisconnect, 2000) 
    }                                     
  })                                     

  dbConnection.on('error', (err) => {
    console.log('Database Error:', err)
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      dbHandleDisconnect()                         
    } else {                                      
      throw err                                  
    }
  })
}

module.exports = { dbConnection, dbHandleDisconnect  }