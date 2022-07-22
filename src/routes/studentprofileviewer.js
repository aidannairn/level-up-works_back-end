const mysql = require('mysql2')
const express = require('express')

const { dbConnection } = require('../config/mysql')
const { getENV } = require('../config/dotenv')

const studentProfiles = express.Router()
const dbName = getENV('database')


studentProfiles.get('/profile-picture-list', (req, res) => {
    dbConnection.query(`
    SELECT  Student.FirstName, Student.LastName, Student.ProfilePic, Student.StudentID,
            Progress_History.StudentID, Progress_History.ProjectID, Progress_History.DateCompleted, Progress_History.ProjectsCompleted

    FROM      Student

    LEFT JOIN Progress_History

    ON Student.StudentID = Progress_History.StudentID;`,
    
     (error, result) => {
         if (error) {
            console.log('Error', error)
            res.send("you have an error:", error.code)
        } else {
/*
            const array = [];
            const obj = {}
            result.map((res, index) => {
                if (Object.keys(obj).length > 0) {
                    //console.log()
                    obj.ProjectID.push(res.ProjectID)
                } else {
                    obj.ProjectID = []
                    obj.StudentID = res.StudentID
                    obj.FirstName = res.FirstName
                    obj.LastName = res.LastName
                    obj.ProjectID.push(res.ProjectID)
                    //console.log('hello', obj)
                    array.push(obj)
                    obj.StudentID = ''
                }
            })
            console.log(array)
 */
            res.send(result)
        }
    })
})

/*
studentProfiles.get('/student-progress', (req, res) => {
    dbConnection.query(`
    SELECT    Student.StudentID, Student.FirstName, Student.LastName
              Progress_History.StudentID, Progress_History.ProjectID, Progress_History.DateCompleted

    FROM      Student

    LEFT JOIN Progress_History

    ON Student.StudentID = Progress_History.StudentID;`,
    
     (error, result) => {
         if (error) {
            console.log('Error', error)
            res.send("you have an error:", error.code)
        } else {
            res.send(result)
        }
    })
})
*/

module.exports = { studentProfiles }