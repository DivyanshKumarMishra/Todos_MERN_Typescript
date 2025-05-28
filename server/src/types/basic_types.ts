import { Request, Response, NextFunction } from "express";
import { Document, Types } from "mongoose";
import { type FieldValidationError } from "express-validator";

export type CorsType = {
  origin: string[];
  methods: string[];
  credentials: boolean;
}

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  userId: Types.ObjectId;
}

export type CustomError = {
  message: string;
  status: number;
  cause: string | FieldValidationError[];
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
}

export type Middleware = (req: Request, res: Response, next: NextFunction) => void
export type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>