import React from 'react';
import  URLImage  from './URLImage';

const AnnotationComponent = ({ annotation, onImageDrag, iconWidth, iconHeight }) => {
  const handleDragEnd = (e) => {
    onImageDrag(e, annotation.image);
  };

  if (annotation.type === 'image') {
    return (
      <URLImage
        src={annotation.image}
        x={annotation.x}
        y={annotation.y}
        width={iconWidth}
        height={iconHeight}
        draggable
        onDragEnd={handleDragEnd}
      />
    );
  }
  
  return null;
};

export default AnnotationComponent;
