const express = require('express')
const cors = require('cors')
const { test } = require('./studentprofileviewer')
const { getENV } = require('./getExpressSQL.js')
const { studentProfiles } = require('./studentprofileviewer.js')
const { StudentProfileTest } = require('./studentprofileviewer')

const app = express()

app.use(cors())

app.use('/students', studentProfiles)

app.use('/test', test)

app.use('/StudentTest', StudentProfileTest)

const port = getENV('port')
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});
