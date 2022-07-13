const express = require('express')

const { signUpUser } = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.post('/signup', signUpUser)

module.exports = { userRouter }