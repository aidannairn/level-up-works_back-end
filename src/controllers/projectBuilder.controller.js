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

const getProjectBuilderCols = (req, res) => {
  const projectID = req.params.projectID
  const queryCols = req.query.cols
  const queryColsArr = queryCols ? queryCols.split(' ') : []
  let queryColsStr = ''
  
  if (queryColsArr.length) {
    const colsStr = queryColsArr.join(', ')
    queryColsStr = colsStr + ','
  }

  dbConnection.query(`SELECT ${queryColsStr} Name, LearningObjective, Instructions, Video FROM ${dbName}.Project WHERE ProjectID = ${projectID}`, (error, result) => {
    if (error) {
      console.log('Error', error)
      res.send('You received an error:', error.code)
    } else {
      const { Name, LearningObjective, Instructions, Video } = result[0]

      const projectBuilderViews = {}

      queryColsArr.map(col => projectBuilderViews[col] = result[0][col])

      projectBuilderViews.learningObjectives = {
          heading: Name,
          htmlStr: LearningObjective
        }
      projectBuilderViews.instructions = JSON.parse(Instructions),
      projectBuilderViews.video = Video

      res.send(projectBuilderViews)
    }
  })
}

module.exports = { getProjectBuilderCols, getProjectCount }