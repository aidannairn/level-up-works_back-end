const express = require('express')

const { refreshToken } = require('../controllers/refreshToken.controller')
const { verifyToken } = require('../middlewares/verifyToken.middleware')
const { signUpUser, loginUser, logoutUser } = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.post('/signup', verifyToken, signUpUser)
userRouter.post('/login', loginUser)
userRouter.get('/token', refreshToken)
userRouter.delete('/logout', logoutUser)

module.exports = { userRouter }