import {Schema, model} from 'mongoose'
import {type IUser} from '../types/basic_types'

interface IUserDocument extends IUser {}

const userSchema = new Schema<IUserDocument>({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

export default model<IUserDocument>('User', userSchema)