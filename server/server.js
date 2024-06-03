import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDb } from './config/connectToDB.js'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

connectToDb()

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})