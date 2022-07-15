const { dbConnection } = require("../config/mysql");

const teacherProfile = (req, res) => {
    let sql = `select * from Teacher;
`;

    dbConnection.query(sql, (err, result) => {
        if (err) throw err;
        const data = result;
        res.send(data);
    });
};

module.exports = {
    teacherProfile,
};
