import { IUser } from './basic_types'

declare global {
  namespace Express {
    interface Request {
      user?: Partial<IUser> | null | undefined
    }
  }
}