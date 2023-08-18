import React, { useState, useRef } from 'react';
import { Group } from 'react-konva';
import URLImage from './URLImage';

function ArrowImage(props) {
  const [rotation, setRotation] = useState(0);
  const imageRef = useRef(null);

  const handleImageDrag = (e) => {
    if (e.currentTarget) {
      setRotation(e.currentTarget.rotation());
    }
  };


  return (
    <Group
      x={props.x}
      y={props.y}
      rotation={rotation}
      draggable
      onDragEnd={handleImageDrag}
    >
      <URLImage
        ref={imageRef}
        src={props.src}
        width={props.width}
        height={props.height}
      />
    </Group>
  );
}

export default ArrowImage;




