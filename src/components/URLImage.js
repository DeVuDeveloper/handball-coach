import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';

function loadImage(src, setImage) {
  const img = new window.Image();
  img.src = src;
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    setImage(img);
  };
}

function URLImage(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadImage(props.src, setImage);
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



