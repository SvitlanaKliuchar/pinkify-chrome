import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDb } from './config/connectToDB.js'
import { Song } from './config/models/song-model.js'
import { Quote } from './config/models/quote-model.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { saveSongsToDB, saveQuotesToDB } from './config/saveToDB.js'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/songs', express.static(path.join(__dirname, 'songs')))

connectToDb()
saveSongsToDB()
saveQuotesToDB()


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
