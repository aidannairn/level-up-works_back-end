const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

const projectSubmissionRouter = (req, res) => {
    res.send("Hello this is test");
};

const test = (req, res) => {
    let sql = "SELECT * FROM Student";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
};

module.exports = {
    projectSubmissionRouter,
    test,
};
