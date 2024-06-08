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

// Route to get all drawings sent to the user 
drawingRouter.get('/drawings/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const userDrawings = await Drawing.find({ receiver: email });
    res.status(200).json(userDrawings);
  } catch (error) {
    console.log("Error getting all drawings for the user", error);
    res.status(500).send("Internal server error");
  }
});

// Route to get all favourite drawings 
drawingRouter.get('/all-fav-drawings/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const userFavDrawings = await Drawing.find({ receiver: email, isFavorite: true });
    res.status(200).json(userFavDrawings);
  } catch (error) {
    console.log("Error getting all fav drawings for the user", error);
    res.status(500).send("Internal server error");
  }
});

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

drawingRouter.post('/toggle-fav-drawing', async (req, res) => {
  const { email, drawingId } = req.body;

  try {
      const drawing = await Drawing.findOne({ _id: drawingId, receiver: email });
      if (drawing) {
          drawing.isFavorite = !drawing.isFavorite;
          await drawing.save();
          res.status(200).json({ message: 'Favorite status toggled successfully', drawing });
      } else {
          res.status(404).json({ error: 'Drawing not found' });
      }
  } catch (error) {
      console.error('Error toggling favorite drawing:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default drawingRouter;
