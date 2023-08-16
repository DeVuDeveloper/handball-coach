import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'react-konva'; // Add this import

function URLImage(props) {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);

  const loadImage = () => {
    const img = new window.Image();
    img.src = props.src;
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      setImage(img);
    };
  };

  useEffect(() => {
    loadImage();
  }, [props.src]);

  return (
    <Image
      image={image}
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      draggable
      onDragEnd={props.onDragEnd}
    />
  );
}

export default URLImage;


