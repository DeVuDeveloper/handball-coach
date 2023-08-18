import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';

function URLImage(props) {
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
      onClick={props.onClick}
      onDragEnd={props.onDragEnd}
      rotation={props.rotation}
    />
  );
}

export default URLImage;


