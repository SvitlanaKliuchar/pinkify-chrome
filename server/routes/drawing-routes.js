import express from 'express';
import { Drawing } from '../config/models/drawing-model.js';

const drawingRouter = express.Router();

// Route to add a drawing to the database
drawingRouter.post('/send-drawing', async (req, res) => {
  const { sender, receiver, image } = req.body;

  try {
    const newDrawing = new Drawing({ sender, receiver, image });
    await newDrawing.save();
    res.status(200).json({ message: 'Doodle sent successfully' });
  } catch (error) {
    console.error('Error sending doodle:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//route to get all drawings sent to the user 
drawingRouter.get('/drawings/:email', async (req, res) => {
    const email = req.params.email
    try {
        const userDrawings = await Drawing.find({receiver: email})
        res.status(200).json(userDrawings)
    } catch (error) {
        console.log("Error getting all drawings for the user", error)
        res.status(500).send("Internal server error")
    }
})

export default drawingRouter;
