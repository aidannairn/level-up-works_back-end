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
const { teacherProfile } = require("./src/routes/teacher-profile");
const { getENV } = require("./src/config/dotenv");
const { userRouter } = require("./src/routes/user.routes");
const {
    projectBuilderRouter,
} = require("./src/routes/projectBuilder.routes.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use("/student/project", projectBuilderRouter);

app.get("/project-submission/", projectSubmissionRouter).put(
    "/project-submission/:complete",
    projectSubmitted
);

app.use("/teacher-profile", teacherProfile);

app.use("/project-library", projectLibraryTeacher);

const port = getENV("port");
app.listen(port);
