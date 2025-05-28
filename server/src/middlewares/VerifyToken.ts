import { AsyncMiddleware } from "../types/basic_types";
import { getCustomError, getUserDataFromToken } from "../utils";

const verifyToken: AsyncMiddleware = async (req, res, next) => {
  try {
    const {authToken} = req.cookies
    if(!authToken) throw ({message: 'Unauthorized', status: 401, cause: 'No auth token found'})
    const user = await getUserDataFromToken(authToken)
    if(!user.name) throw ({message: 'Unauthorized', status: 401, cause: 'Invalid auth token'})
    req.user = user
    next()
  } catch (error: any) {
    const {status, message, cause} = getCustomError(error) 
    res.status(status).json({message, cause})
  }
}

export default verifyToken