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

// Route to delete a specific drawing for a specific user
drawingRouter.delete('/drawings/:email/:_id', async (req, res) => {
  const email = req.params.email;
  const drawingId = req.params._id;
  try {
      await Drawing.deleteOne({ receiver: email, _id: drawingId });
      res.status(200).json({ message: `Drawing with id ${drawingId} was deleted from the database.` });
  } catch (error) {
      console.error('Error deleting a drawing from the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a favorite drawing
drawingRouter.post('/fav-drawing', async (req, res) => {
  const { sender, receiver, image } = req.body;

  try {
      // Create a new instance of the Drawing model
      const newFavoriteDrawing = new Drawing({ sender, receiver, image, timestamp, isFavorite: true });

      // Save the favorite drawing to the database
      await newFavoriteDrawing.save();

      res.status(200).json({ message: 'Favorite drawing added successfully' });
  } catch (error) {
      console.error('Error adding favorite drawing:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to remove a favorite drawing
drawingRouter.delete('/fav-drawing/:email/:_id', async (req, res) => {
  const email = req.params.email;
  const drawingId = req.params._id;

  try {
      await Drawing.deleteOne({ receiver: email, _id: drawingId, isFavorite: true });
      res.status(200).json({ message: `Favorite drawing with id ${drawingId} was removed from the database.` });
  } catch (error) {
      console.error('Error removing favorite drawing:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default drawingRouter;
