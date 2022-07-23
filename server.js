const express = require('express')
const cookieParser = require('cookie-parser') 
const cors = require('cors')
const { studentProfiles } = require('./src/routes/studentprofileviewer')

const { getENV } = require('./src/config/dotenv')

const { studentProfiles } = require('./src/routes/studentprofileviewer')

const {
    projectSubmissionRouter,
    projectSubmitted,
} = require("./src/routes/project-submission");
const {
    projectLibraryTeacher,
} = require("./src/routes/project-library-teacher");
const { teacherProfile } = require("./src/routes/teacher-profile");
const { userRouter } = require("./src/routes/user.routes");
const {
    projectBuilderRouter,
} = require("./src/routes/projectBuilder.routes.js");

const app = express();

app.use(cors({ credentials:true, origin: getENV('corsOrigin') }))
app.use(cookieParser())
app.use(express.json())

app.use(userRouter);
app.use("/student/project", projectBuilderRouter);

app.use('/student-profiles', studentProfiles)

app.get("/project-submission/", projectSubmissionRouter).put(
    "/project-submission/:complete",
    projectSubmitted
);

app.use("/teacher-profile", teacherProfile);

app.use("/project-library", projectLibraryTeacher);

const port = getENV("port");
app.listen(port);

