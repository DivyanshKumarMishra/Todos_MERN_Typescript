import dotenv from 'dotenv'
dotenv.config()

const PORT: number = Number(process.env.PORT) || 3000
const MONGO_URI: string = process.env.MONGO_DB_URI || ''
const JWT_SECRET: string = process.env.JWT_SECRET || ''
const ORIGINS: string[] = process.env.ORIGIN?.split(',') || []
const SALT: number = 12

export {PORT, MONGO_URI, JWT_SECRET, ORIGINS, SALT}