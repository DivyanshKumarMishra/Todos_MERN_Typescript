import jwt, { JwtPayload } from 'jsonwebtoken'
import {JWT_SECRET} from '../utils/constants'
import { IUser, type CustomError } from '../types/basic_types'
import { type FieldValidationError } from 'express-validator'

const default_status: number = 500
const default_message: string = 'Something went wrong'

const getCustomError = (error: CustomError) => {
  const status = error.status || default_status
  const message = error.status === default_status ? default_message : (error.message || default_message)
  let cause;
  if(error.cause){
    if(typeof error.cause === 'string') cause = error.cause
    else{
      let errorsObj: Record<string, string> = {}
      // console.log(error)
      error.cause.forEach((err: FieldValidationError) => {
        errorsObj[err.path] = errorsObj[err.path] ? `${errorsObj[err.path]}, ${err.msg}` : err.msg
      })
      cause = errorsObj
    }
  }
  return {status, message, cause}
}

const getUserDataFromToken: (token: string) => Promise<IUser> = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload): void => {
      if(err) return reject(err)
      resolve(payload as IUser)
    })
  })
}

export {getCustomError, getUserDataFromToken}