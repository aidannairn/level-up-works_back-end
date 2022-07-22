const { dbConnection } = require("../config/mysql");

const projectLibraryTeacher = (req, res) => {
    let sql = `select firstname, lastname, profilepic, projectid, name, activitytype, yearlevel, course, subscription, subjectmatter, projectpic
from Project_List, Teacher
`;

    dbConnection.query(sql, (err, result) => {
        if (err) throw err;
        const data = result;
        res.send(data);
    });
};

module.exports = {
    projectLibraryTeacher,
};
