import express, { RequestHandler } from 'express'
import { getTodos, addTodo, editTodo, deleteTodo } from '../controllers/TodoController'
const todoRouter = express.Router()

todoRouter.get('/get-todos', getTodos)
todoRouter.post('/add-todo', addTodo)
todoRouter.patch('/edit-todo/:id', editTodo)
todoRouter.delete('/delete-todo/:id', deleteTodo)

export default todoRouter