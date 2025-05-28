import {body, validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import {JWT_SECRET, SALT} from '../utils/constants'
import bcrypt from 'bcrypt'
import { type  AsyncMiddleware} from '../types/basic_types'
import User from '../models/user'
import { TOKEN_EXPIRY, MILLISECONDS_PER_SECOND } from '../utils/times'
import { getCustomError } from '../utils'
import { type CookieOptions } from 'express'

const signupUser: AsyncMiddleware = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw ({status:400, message: 'Validation Errors', cause: errors.array()})
    }
    const {name, email, password} = req.body
    const user = await User.findOne({email})
    if(user) throw ({status: 400, message: 'Email already taken'})
    const hash_pass = await bcrypt.hash(password, SALT); 
    await new User({name, email, password: hash_pass}).save()
    res.status(201).json({message: 'Account created successfully'})
  } catch (error: any) {
    const {status, message, cause} = getCustomError(error) 
    res.status(status).json({message, cause})
  }
};

const loginUser: AsyncMiddleware = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw ({status:400, message: 'Validation Errors', cause: errors.array()})
    }
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) throw ({message: 'User does not exist'})
    const match = await bcrypt.compare(password, user.password!)
    if(!match) throw ({message: 'Invalid password'})
    const token = jwt.sign({_id:user._id, email:user.email, name:user.name}, JWT_SECRET, {expiresIn: TOKEN_EXPIRY})
    const cookieOptions: CookieOptions = {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: TOKEN_EXPIRY * MILLISECONDS_PER_SECOND
    }
    res.cookie('authToken', token, cookieOptions)
    res.status(200).json({user: {name: user.name, email: user.email, _id: user._id}})
  } catch (error: any) {
    const {status, message, cause} = getCustomError(error)
    res.status(status).json({message, cause})
  }
};

const logout: AsyncMiddleware = async (req, res, next) => {
  try {
    res.clearCookie('authToken', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    })
    res.status(200).json({message: 'You have been signed out'})
  } catch (error: any) {
    const {status, message, cause} = getCustomError(error)
    res.status(status).json({message, cause})
  }
};

const signup = [
  body('name')
    .isLength({min:3})
    .withMessage('name must be at least 3 characters long')
    .trim()
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage("name must only contain letters, spaces, apostrophes, or hyphens"),
  body('email')
    .trim()
    .isEmail()
    .withMessage('enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&^#(){}[\]<>.,:;'"\\|/~_+=-]/)
    .withMessage('Password must contain at least one special character'),

  signupUser
]

const login = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&^#(){}[\]<>.,:;'"\\|/~_+=-]/)
    .withMessage('Password must contain at least one special character'),

  loginUser
]

export { signup, login, logout };