import { Types } from 'mongoose'
import Todo, { type ITodoDocument } from '../models/todo'
import User from '../models/user'
import { type AsyncMiddleware } from '../types/basic_types'
import { getCustomError } from '../utils'

const addTodo: AsyncMiddleware = async (req, res, next) => {
  try {
    const { title } = req.body
    const user = req.user
    if(!title) throw ({status: 400, message: 'Missing Params', cause: 'title is required'})
    const db_user = await User.findById(user?._id)
    if(!db_user) throw ({status: 400, message: 'User does not exist'})
    const new_todo = await new Todo({title, userId: db_user._id}).save()
    res.status(201).json(new_todo)
  } catch (error: any) {
    const {status, message, cause} = getCustomError(error) 
    res.status(status).json({message, cause})
  }
}

const editTodo: AsyncMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, completed, action} = req.body
    if(!id || !action) throw ({status: 400, message: 'Missing Params', cause: 'id and action are required'})
    let db_todo: ITodoDocument | null; 
    db_todo = await Todo.findById(id)
    if(!db_todo) throw ({status: 400, message: 'Todo does not exist'})
    if(action === 'edit') {
      db_todo = await Todo.findOneAndUpdate({_id: id}, {title}, {new: true})
    }else if(action === 'complete'){
      db_todo = await Todo.findOneAndUpdate({_id: id}, {completed}, {new: true})
    }
    res.status(200).json(db_todo)
  } catch (error: any) {
    const {status, message, cause} = getCustomError(error) 
    res.status(status).json({message, cause})
  }
}
const deleteTodo: AsyncMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params
    if(!id) throw ({status: 400, message: 'Missing Params', cause: 'id is required'})
    let db_todo: ITodoDocument | null; 
    db_todo = await Todo.findById(id)
    if(!db_todo) throw ({status: 400, message: 'Todo does not exist'})
    db_todo = await Todo.findOneAndDelete({_id: id})
    res.status(200).json({message: 'Todo deleted successfully'})
  } catch (error: any) {
    const {status, message, cause} = getCustomError(error) 
    res.status(status).json({message, cause})
  }
}
const getTodos: AsyncMiddleware = async (req, res, next) => {
  try {
    const user = req.user
    const id = user?._id
    if(!id) throw ({status: 400, message: 'Missing Params', cause: 'userId is required'})
    const todos = await Todo.find({userId: id})
    res.status(200).json(todos)
  } catch (error: any) {
    const {status, message, cause} = getCustomError(error) 
    res.status(status).json({message, cause})
  }
}

export { addTodo, editTodo, deleteTodo, getTodos }