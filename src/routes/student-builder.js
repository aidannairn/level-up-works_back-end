const express = require('express')

const { dbConnection, dbHandleDisconnect } = require('../config/mysql')
const { getENV } = require('../config/dotenv')

const studentProjectRouter = express.Router()
const dbName = getENV('database')

studentProjectRouter.get('/project/:projectID', (req, res) => {
  const projectID = req.params.projectID

  dbConnection.query(`SELECT LearningObjective, Instructions, Video FROM ${dbName}.Project WHERE ProjectID = ${projectID}`, (error, result) => {
    if (error) {
      console.log('Error', error)
      dbHandleDisconnect()
      res.send('You received an error:', error.code)
    } else {
      const parseJSON = field => JSON.parse(result[0][field])

      const fields = {
        learningObjectives: parseJSON('LearningObjective'),
        instructions: parseJSON('Instructions'),
        videos: parseJSON('Video')
      }
      res.send(fields)
    }
  })
})

module.exports = { studentProjectRouter }