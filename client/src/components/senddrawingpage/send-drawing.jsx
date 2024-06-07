import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

export default function SendDrawing() {
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const { user } = useUser();
  const [receiverEmail, setReceiverEmail] = useState('');
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    const offscreenCanvas = offscreenCanvasRef.current;
    canvas.width = 300;
    canvas.height = 200;
    offscreenCanvas.width = 300;
    offscreenCanvas.height = 200;
    const context = canvas.getContext('2d');
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = color;
    setCtx(context);
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
    }
  }, [color]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    // Copy the current canvas to the offscreen canvas to preserve the drawing state
    const offscreenContext = offscreenCanvasRef.current.getContext('2d');
    offscreenContext.drawImage(canvasRef.current, 0, 0);
  };

  const stopDrawing = () => {
    ctx.closePath();
    setIsDrawing(false);
  };

  const sendDrawing = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    try {
      const response = await axios.post('/api/send-drawing', {
        sender: user.primaryEmailAddress.emailAddress,
        receiver: receiverEmail,
        image: dataURL,
      });
      console.log('Drawing sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending drawing:', error);
    }
  };

  const restoreDrawing = () => {
    const offscreenContext = offscreenCanvasRef.current.getContext('2d');
    ctx.drawImage(offscreenCanvasRef.current, 0, 0);
  };

  return (
    <div className='send-drawing-container'>
      <div className='color-picker-container'>
        <label htmlFor="colorPicker">Select Color: </label>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className='line-width-container'>
        <label htmlFor="lineWidth">Line Width: </label>
        <input
          type="range"
          id="lineWidth"
          min="1"
          max="10"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        />
      </div>
      <canvas
        className='canvas'
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <input
        className='email-input'
        type="email"
        placeholder="email:"
        value={receiverEmail}
        onChange={(e) => setReceiverEmail(e.target.value)}
      />
      <button className='btn send-btn' onClick={sendDrawing}>send</button>
      <canvas ref={offscreenCanvasRef} style={{ display: 'none' }} />
    </div>
  );
}
