import {UserController} from '../Controller/UserController'
import express from 'express'

export const userRouter = express.Router()

userRouter.post("/signup", new UserController().signup)
userRouter.post("/signup/admin", new UserController().signupAdmin)
userRouter.post("/login", new UserController().login)