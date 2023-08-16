import React, { useState } from 'react';
import {Group, Text, Rect } from 'react-konva';

const TextAnnotationComponent = ({ textAnnotation, index, onTextDrag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.evt.clientX - textAnnotation.x,
      y: e.evt.clientY - textAnnotation.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onTextDrag(index, textAnnotation.x, textAnnotation.y);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const updatedX = e.evt.clientX - offset.x;
    const updatedY = e.evt.clientY - offset.y;

    onTextDrag(index, updatedX, updatedY);
  };

  return (
    <Group
      x={textAnnotation.x}
      y={textAnnotation.y}
      draggable
      onDragStart={handleMouseDown}
      onDragEnd={handleMouseUp}
      onDragMove={handleMouseMove}
    >
      <Rect
        width={textAnnotation.width}
        height={textAnnotation.height}
        fill="green" // Background color
      />
      <Text
        text={textAnnotation.text}
        fill="red" 
        fontSize={16}
        fontStyle="bold"
        width={textAnnotation.width}
        height={textAnnotation.height}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};

export default TextAnnotationComponent;






