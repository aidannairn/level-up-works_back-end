const express = require('express')

const { getProjectBuilderCols, getProjectCount, submitProject } = require('../controllers/projectBuilder.controller')

const projectBuilderRouter = express.Router()

projectBuilderRouter.get('/', getProjectCount)
projectBuilderRouter.get('/:projectID', getProjectBuilderCols)
projectBuilderRouter.put('/:projectID/student/:studentID', submitProject)

module.exports = { projectBuilderRouter }