import express from 'express'
import getUserInfo from '../controllers/UserController'
const userRouter = express.Router()

userRouter.get('/user-info', getUserInfo)

export default userRouter