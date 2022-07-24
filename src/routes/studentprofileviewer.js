const mysql = require('mysql2')
const express = require('express')

const { dbConnection } = require('../config/mysql')
const { getENV } = require('../config/dotenv')

const studentProfiles = express.Router()
const dbName = getENV('database')


studentProfiles.get('/profile-picture-list', (req, res) => {
    dbConnection.query(`
SELECT  Student.firstName, Student.lastName, Student.profilePic, 
    Student.studentID, Progress_History.projectID, Progress_History.dateCompleted

FROM    Progress_History

INNER JOIN Student

ON Progress_History.StudentID = Student.StudentID;`,
    
     (error, result) => {
         if (error) {
            console.log('Error', error)
            res.send("you have an error:", error.code)
        } else {

         // console.log(result)
         const studentArr = [];
         result.map(histItem => {
             const {
                 firstName,
                 lastName,
                 profilePic,
                 studentID,
                 projectID,
                 dateCompleted
             } = histItem

             // console.log(histItem)

             const project = { projectID, dateCompleted }

             const currentStudentIndex = studentArr.findIndex(student => student.studentID === studentID)

             if (currentStudentIndex >= 0) {
                 studentArr[currentStudentIndex].projects.push(project)
             } else {
                 const student = {
                     firstName,
                     lastName,
                     profilePic,
                     studentID,
                     projects: [
                         project
                     ]
                 }
                 // console.log(student)
                 studentArr.push(student)
             }
         })
         console.log(studentArr)
         res.send(studentArr)
     }
 })
})


module.exports = { studentProfiles }