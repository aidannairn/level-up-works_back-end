const express = require('express')
const cors = require('cors')

const { getENV } = require('./src/config/dotenv')
const { userRouter } = require('./src/routes/user.routes')
const { projectBuilderRouter } = require('./src/routes/projectBuilder.routes.js')

const app = express()

app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use('/student/project', projectBuilderRouter)

const port = getENV('port')
app.listen(port);