const { dbConnection } = require("../config/mysql");

const projectSubmissionRouter = (req, res) => {
    let sql = `SELECT 
    Student.studentID,
    projectid,
    firstname,
    profilePic,
    dateSubmitted,
    dateCompleted,
    submission
FROM
    Student,
    Progress_History
WHERE
    Student.StudentID = Progress_History.StudentID
        AND DateCompleted = '0000-00-00'
        AND Submission IS NOT NULL
        AND DateSubmitted != '0000-00-00'
ORDER BY DateSubmitted ASC`;

    dbConnection.query(sql, (err, result) => {
        if (err) throw err;
        const data = result;
        res.send(data);
    });
};

const projectSubmitted = (req, res) => {
    const users = req.params.complete;
    console.log(`before connection`, req.params.complete);
    let sql = `UPDATE Progress_History set DateCompleted = CURRENT_DATE()
    where StudentID in (${users}) AND DateCompleted = '0000-00-00'`;

    dbConnection.query(sql, (err, result) => {
        if (err) throw err;
        ("hello");
    });
};

module.exports = {
    projectSubmissionRouter,
    projectSubmitted,
};
