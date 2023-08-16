import React from 'react';
import { Image } from 'react-konva';

const IconButton = ({ image, x, y, onClick }) => (
  <Image
    image={image}
    x={x - 0.5 * image.width}
    y={y - 0.5 * image.height}
    onClick={onClick}
    draggable
  />
);

export default IconButton;


