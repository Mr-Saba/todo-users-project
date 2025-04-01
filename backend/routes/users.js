import express from "express";
import { loginUser, logoutUser, getToken, getUser, registerUser, updateUser, UsersLeaderBoard } from "../controllers/users.js";
import { auth } from '../middlewares/auth.js'

const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
UsersRouter.post('/logout', logoutUser)
UsersRouter.post('/get-token', getToken)
UsersRouter.get('/get-user', getUser)
UsersRouter.post('/register', registerUser)
UsersRouter.put('/updateUser', auth, updateUser)
UsersRouter.get('/leaderboard', UsersLeaderBoard);

export default UsersRouter