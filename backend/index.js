import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import TodosRouter from './routes/todos.js'
import logger from './middlewares/logger.js'
import UsersRouter from './routes/users.js'
import { auth } from './middlewares/auth.js'
import cookieParser from 'cookie-parser';
import connectDB from './db/connection.js'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cookieParser()); //to access cookies in node.js

app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin || '*'); // Allow any origin
    },    
    credentials: true // Allow cookies to be sent
}));
// app.use(logger)

app.use('/api/todos', auth, TodosRouter)
app.use('/api/users', UsersRouter)

app.listen(3003, () => {
    console.log('server has started')
    connectDB(process.env.CONNECTION_STRING)
})