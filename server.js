const express = require('express')
const cors = require('cors')

const { getENV } = require('./src/config/dotenv')
const { studentProjectRouter } = require('./src/routes/student-builder.js')
const { studentProfiles } = require('./src/routes/studentprofileviewer')



const app = express();

app.use(cors())

app.use('/student-builder', studentProjectRouter)
app.use('/student-profiles', studentProfiles)



const port = getENV('port')

app.listen(port, () => {
    console.log('running on port 4000')
});
