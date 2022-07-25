const { dbConnection } = require("../config/mysql");

const projectSubmissionRouter = (req, res) => {
    let sql = `SELECT 
    Student.studentID,
    projectid,
    firstname,
    profilePic,
    dateSubmitted,
    dateCompleted,
    submission,
    completedid
FROM
    Student,
    Progress_History
WHERE
    Student.StudentID = Progress_History.StudentID
        AND DateCompleted = '0000-00-00'
        AND Submission != "" or null
        AND DateSubmitted != '0000-00-00'
ORDER BY DateSubmitted ASC`;

    dbConnection.query(sql, (err, result) => {
        if (err) throw err;
        const data = result;
        res.send(data);
    });
};

const projectSubmitted = (req, res) => {
    const projectKey = req.body.projectKey;
    const studentKey = req.body.studentKey;
    let sql = `UPDATE Progress_History set DateCompleted = CURRENT_DATE()
    where CompletedID in (${studentKey}) AND ProjectID in (${projectKey})`;

    dbConnection.query(sql, (err, result) => {
        if (err) throw err;
        ("error during update request");
    });
};

module.exports = {
    projectSubmissionRouter,
    projectSubmitted,
};
