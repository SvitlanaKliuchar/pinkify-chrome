import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDb } from './config/connectToDB.js'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

connectToDb()
const clientId = '1769490f64fc489da16f77d691c9720e';
const clientSecret = 'c610686d96304120bc3cdc94a314f4ae';
const redirectUri = 'http://localhost:3000/callback'; // Ensure this matches the frontend redirect URI

app.post('/login', async (req, res) => {
    const { code } = req.body;

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.response.data);
    }
});


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})