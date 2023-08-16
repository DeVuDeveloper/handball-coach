import React from 'react';
import  URLImage  from './URLImage';

const AnnotationComponent = ({ annotation, onImageDrag, iconSize }) => {
  const handleDragEnd = (e) => {
    onImageDrag(e, annotation.image);
  };

  if (annotation.type === 'image') {
    return (
      <URLImage
        src={annotation.image}
        x={annotation.x}
        y={annotation.y}
        iconSize={iconSize}
        draggable
        onDragEnd={handleDragEnd}
      />
    );
  }
  
  return null;
};

export default AnnotationComponent;
