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

  dbConnection.query(`SELECT ${queryColsStr} ProjectID, Name, LearningObjective, Instructions, Video FROM ${dbName}.Project WHERE ProjectID = ${projectID}`, (error, result) => {
    if (error) {
      console.log('Error', error)
      res.send('You received an error:', error.code)
    } else {
      const { ProjectID, Name, LearningObjective, Instructions, Video } = result[0]

      const projectBuilderViews = {}

      queryColsArr.map(col => projectBuilderViews[col] = result[0][col])

      projectBuilderViews.learningObjectives = {
          heading: Name,
          htmlStr: LearningObjective
        }
      projectBuilderViews.instructions = JSON.parse(Instructions),
      projectBuilderViews.video = Video
      projectBuilderViews.id = ProjectID

      res.send(projectBuilderViews)
    }
  })
}

const submitProject = (req, res) => {
  try {
    const { projectID, studentID } = req.params
    const imageURL = req.body.imageURL

    const resJSON = {}
  
    let query = `
      UPDATE  Progress_History 
      SET     DateSubmitted = CURRENT_DATE(),
              Submission = "${imageURL}"
      WHERE   ProjectID = (${projectID}) 
      AND     StudentID = ${studentID}
    `
  
    dbConnection.query(query, (error, result) => {
      if (error) {
        console.log('Error', error)
        resJSON.type = 'error',
        resJSON.msg = `You received an error: ${error.code}`
        res.json(resJSON)
      } else {
        resJSON.type = 'success',
        resJSON.msg = `Your project has been submitted. Your teacher will be in touch.`
        res.status(200).json(resJSON)
      }
    })

  } catch (error) {
    console.log(error)
  }
}

module.exports = { getProjectBuilderCols, getProjectCount, submitProject }