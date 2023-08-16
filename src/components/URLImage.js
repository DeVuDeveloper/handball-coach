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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.src, props.crossOrigin]);
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


