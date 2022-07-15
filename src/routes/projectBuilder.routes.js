const express = require('express')

const { getProjectBuilderCols, getProjectCount } = require('../controllers/projectBuilder.controller')

const projectBuilderRouter = express.Router()

projectBuilderRouter.get('/', getProjectCount)
projectBuilderRouter.get('/:projectID', getProjectBuilderCols)

module.exports = { projectBuilderRouter }