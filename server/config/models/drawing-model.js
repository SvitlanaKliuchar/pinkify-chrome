import mongoose from 'mongoose';

const DrawingSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Drawing = mongoose.model('Drawing', DrawingSchema);

export  { Drawing };
