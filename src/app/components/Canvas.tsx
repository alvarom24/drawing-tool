'use client';

import React, { useRef, useState, useEffect } from 'react';
import { canvasStyles } from './styles/canvas.styles';
import Toolbar from './Toolbar';
import TextInput from './TextInput';

const Canvas = () => {
  const classes = canvasStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraserMode, setEraserMode] = useState(false);
  const [textboxMode, setTextboxMode] = useState(false);
  const [textBoxes, setTextBoxes] = useState<
    { x: number; y: number; text: string; color: string }[]
  >([]);
  const [drawColor, setDrawColor] = useState('black');
  const [textboxColor, setTextboxColor] = useState('black');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 4;
        ctx.strokeStyle = drawColor;
      }
    }
  }, [drawColor]);

  const isClickOnTextbox = (
    x: number,
    y: number,
    textbox: { x: number; y: number }
  ) => {
    const textboxWidth = 100;
    const textboxHeight = 30;
    return (
      x >= textbox.x &&
      x <= textbox.x + textboxWidth &&
      y >= textbox.y &&
      y <= textbox.y + textboxHeight
    );
  };

  const erase = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasBounds = canvasRef.current?.getBoundingClientRect();
    if (!canvasBounds) return;

    const x = event.clientX - canvasBounds.left;
    const y = event.clientY - canvasBounds.top;

    const textboxToRemove = textBoxes.findIndex(textBox =>
      isClickOnTextbox(x, y, textBox)
    );
    if (textboxToRemove !== -1) {
      const updatedTextBoxes = [...textBoxes];
      updatedTextBoxes.splice(textboxToRemove, 1);
      setTextBoxes(updatedTextBoxes);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.clearRect(x, y, 40, 40);
    }
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!eraserMode && !textboxMode) {
      setIsDrawing(true);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = drawColor;
        ctx.beginPath();
        ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      }
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.closePath(); // Ends the current path to avoid connecting lines
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || eraserMode || textboxMode) return; // Disable drawing in textboxMode
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      ctx.stroke();
    }
  };

  const addTextbox = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!textboxMode) return;
    const canvasBounds = canvasRef.current?.getBoundingClientRect();
    if (canvasBounds) {
      const x = event.clientX - canvasBounds.left;
      const y = event.clientY - canvasBounds.top;
      const newTextbox = { x, y, text: '', color: textboxColor }; // Add textbox color
      setTextBoxes([...textBoxes, newTextbox]);
    }
  };

  const handleTextChange = (index: number, value: string) => {
    const updatedTextBoxes = [...textBoxes];
    updatedTextBoxes[index].text = value;
    setTextBoxes(updatedTextBoxes);
  };

  return (
    <>
      <Toolbar
        eraserMode={eraserMode}
        textboxMode={textboxMode}
        drawColor={drawColor}
        textboxColor={textboxColor}
        toggleEraserMode={() => setEraserMode(!eraserMode)}
        toggleTextboxMode={() => setTextboxMode(!textboxMode)}
        setDrawColor={setDrawColor}
        setTextboxColor={setTextboxColor}
        classes={classes}
      />
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={eraserMode || textboxMode ? addTextbox : startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={eraserMode ? erase : draw}
          style={{ border: '1px solid black', background: 'white' }}
        />
        <TextInput
          textBoxes={textBoxes}
          textboxMode={textboxMode}
          handleTextChange={handleTextChange}
        />
      </div>
    </>
  );
};

export default Canvas;
