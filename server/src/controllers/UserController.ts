import { AsyncMiddleware } from "../types/basic_types"
import { getCustomError } from "../utils"

const getUserInfo: AsyncMiddleware = async (req, res, next) => {
  try {
    const user = req.user
    res.status(200).json({user})
  } catch (error: any) {
    const {status, message, cause} = getCustomError(error)
    res.status(status).json({message, cause})
  }
}

export default getUserInfo