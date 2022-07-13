const express = require('express')

const { getSharedBuilderCols, getProjectCount } = require('../controllers/projectBuilder.controller')

const projectBuilderRouter = express.Router()

projectBuilderRouter.get('/', getProjectCount)
projectBuilderRouter.get('/project/:projectID', getSharedBuilderCols)

module.exports = { projectBuilderRouter }