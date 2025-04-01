import express from "express";
import { getTodos, addTodo, editTodo, deleteTodo } from "../controllers/todos.js";
const TodosRouter = express.Router()

TodosRouter.get('/:userId', getTodos)
TodosRouter.post('/', addTodo)
TodosRouter.put('/:id', editTodo)
TodosRouter.delete('/:id', deleteTodo)

export default TodosRouter