const fillUserQuery = (userType) => {
  const strArr = [ 'studentID', 'teacherID', 'firstName', 'lastName', 'email', 'school', 'profilePic', 'dateOfBirth', 'contactNumber', 'course' ]
  // If userType is equal to "Teacher" - Remove unnecessary columns
  if (userType === 'Teacher') {
    strArr.shift() // Remove first - "TeacherID"
    strArr.pop() // Remove last - "Course"
  }

  const str = strArr.join(', ')
  return str
}

module.exports = { fillUserQuery }