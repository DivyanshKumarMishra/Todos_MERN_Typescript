import {Schema, model, Document} from 'mongoose'
import { type ITodo } from '../types/basic_types'

export interface ITodoDocument extends ITodo {}

const todoSchema = new Schema<ITodoDocument>({
  title: {type: String, required: true},
  completed: {type:Boolean, required: true, default: false},
  userId: {type: Schema.Types.ObjectId, ref:'User', required: true}
})

export default model<ITodoDocument>('Todo', todoSchema) 