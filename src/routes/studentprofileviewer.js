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

            //mapping through progress history and creating project item from DB columns
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

             const project = { projectID, dateCompleted }

             //checking to see if the student has already been added, if yes store in array
             const currentStudentIndex = studentArr.findIndex(student => student.studentID === studentID)

             //add project to current students project property, if not exist, create the student.
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

                 //push new student to array
                 studentArr.push(student)
             }
         })
         console.log(studentArr)
         res.send(studentArr)
     }
 })
})


module.exports = { studentProfiles }