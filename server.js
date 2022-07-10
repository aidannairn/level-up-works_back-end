const express = require("express");
const {
    projectSubmissionRouter,
} = require("./controllers/project-submission.js");
const { test } = require("./controllers/project-submission");
const { getENV } = require("./getExpressSQL");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/project-submission", projectSubmissionRouter);

app.use("/test", test);

const port = getENV("port");
app.listen(port);
