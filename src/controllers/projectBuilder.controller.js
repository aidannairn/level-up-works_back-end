const { dbConnection } = require('../config/mysql')
const { getENV } = require('../config/dotenv')

const dbName = getENV('database')

const getProjectCount = (req, res) => {
  dbConnection.query(`SELECT COUNT(*) AS totalProjects FROM ${dbName}.Project`, (error, result) => {
    if (error) {
      console.log('Error', error)
      res.send('You received an error:', error.code)
    } else {
      res.send(result[0])
    }
  })
}

const getSharedBuilderCols = (req, res) => {
  const projectID = req.params.projectID

  dbConnection.query(`SELECT Name, LearningObjective, Instructions, Video FROM ${dbName}.Project WHERE ProjectID = ${projectID}`, (error, result) => {
    if (error) {
      console.log('Error', error)
      res.send('You received an error:', error.code)
    } else {
      const { Name, LearningObjective, Instructions, Video } = result[0]

      const studentBuilderViews = {
        learningObjectives: {
          heading: Name,
          htmlStr: LearningObjective
        },
        instructions: JSON.parse(Instructions),
        video: Video
      }
      res.send(studentBuilderViews)
    }
  })
}

module.exports = { getSharedBuilderCols, getProjectCount }