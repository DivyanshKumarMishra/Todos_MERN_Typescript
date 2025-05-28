import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

// local modules
import {PORT, MONGO_URI, ORIGINS} from './utils/constants'
import { CorsType } from './types/basic_types'
import { AuthRouter, TodoRouter } from './routes'
import ErrorPage from './controllers/ErrorController'
import verifyToken from './middlewares/VerifyToken'
import UserRouter from './routes/UserRouter'

const app = express()
const corsOptions: CorsType = {
  origin: ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', AuthRouter)
app.use(verifyToken)
app.use('/api/user', UserRouter)
app.use('/api/todos', TodoRouter)

app.use(ErrorPage)

async function runServer(): Promise<void>{
  try {
    const mongo = await mongoose.connect(MONGO_URI)
    if(mongo){
      app.listen(PORT, () => {
        console.log(`listening on port http://localhost:${PORT}`)
      })
    }
  } catch (error: any) {
    console.log('Something went wrong', error.message);
  }
}

runServer()
