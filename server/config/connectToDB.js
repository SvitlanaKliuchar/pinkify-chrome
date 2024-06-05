import mongoose from 'mongoose'

export const connectToDb = () => {
    try {
        mongoose.connect(process.env.DB_URL)
        console.log("Connected to DB")
    } catch (error) {
        console.log(`Error connecting to DB: ${error}`)
    }
}