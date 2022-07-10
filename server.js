const express = require('express')
const cors = require('cors')

const { getENV } = require('./src/config/dotenv')
const { studentProjectRouter } = require('./src/routes/student-builder.js')

const app = express()

app.use(cors())

app.use('/student-builder', studentProjectRouter)

const port = getENV('port')
app.listen(port);