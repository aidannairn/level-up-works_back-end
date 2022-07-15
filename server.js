const express = require("express");
const cors = require("cors");
const { getENV } = require("./src/config/dotenv");

const {
    projectSubmissionRouter,
    projectSubmitted,
} = require("./src/routes/project-submission");
const {
    projectLibraryTeacher,
} = require("./src/routes/project-library-teacher");
const { studentProjectRouter } = require("./src/routes/student-builder.js");
const { teacherProfile } = require("./src/routes/teacher-profile");

const app = express();

app.use(cors());

app.use("/student-builder", studentProjectRouter);

app.get("/project-submission/", projectSubmissionRouter).put(
    "/project-submission/:complete",
    projectSubmitted
);

app.use("/teacher-profile", teacherProfile);

app.use("/project-library", projectLibraryTeacher);

const port = getENV("port");
app.listen(port);
