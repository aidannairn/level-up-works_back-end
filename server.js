const express = require('express')
const cookieParser = require('cookie-parser') 
const cors = require('cors')

const { getENV } = require('./src/config/dotenv')
const { userRouter } = require('./src/routes/user.routes')
const { projectBuilderRouter } = require('./src/routes/projectBuilder.routes.js')

const app = express()

app.use(cors({ credentials:true, origin: getENV('corsOrigin') }))
app.use(cookieParser())
app.use(express.json())

app.use(userRouter)
app.use('/student/project', projectBuilderRouter)

const port = getENV('port')
app.listen(port);