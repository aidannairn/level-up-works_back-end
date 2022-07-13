const express = require('express')
const cors = require('cors')

const { getENV } = require('./src/config/dotenv')
const { projectBuilderRouter } = require('./src/routes/projectBuilder.routes.js')

const app = express()

app.use(cors())

app.use('/student-builder', projectBuilderRouter)

const port = getENV('port')
app.listen(port);