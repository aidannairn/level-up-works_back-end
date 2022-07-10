const express = require('express')
const studentProfiles = express.Router()
const mysql = require('mysql2')

const { getENV, connectToDB } = require('./getExpressSQL.js')
const dbName = getENV('database')


studentProfiles.get('/studentprofileviewer/student', (req, res) => {
    const StudentID = req.params.StudentID

    console.log('first fetch')
    connectToDB().query(`SELECT * FROM ${dbName}.Student
     WHERE StudentID = ${StudentID} `, (error, result) => {
        if(error) {
            console.log("Error mate", error);
            res.send('you got an error buddy', error.code);
        } else {
            res.send(result[0]);
        }
    })
})


const connection = mysql.createConnection ({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

})

const StudentProfileTest = (req, res) => {
    connection.query(`SELECT * FROM Student;`),
    (error, result) => {
        if(error) {
            console.log('error', error);
            res.send('you have an error', error.code);
        } else {
            res.send(result[0]);
        }
    }
}



const test = (req, res) => {
    res.send('hello from test')
}

module.exports = { studentProfiles, test, StudentProfileTest }