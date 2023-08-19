import React from 'react';
import URLImage from './URLImage';

const ArrowsComponent = ({
  arrow,
  onArrowDrag,
  width,
  height,
  handleRotateArrows,
  index,
}) => {
  const handleDragEnd = (e) => {
    onArrowDrag(e, arrow.arrow);
  };

  const handleRotateArrow = (e) => {
    if (e.evt.button === 2) {
      if (typeof arrow.rotation === 'number') {
        handleRotateArrows(index);
      }
    }
  };

  return (
    <React.Fragment>
  
          <URLImage
            src={arrow.arrow}
            x={arrow.x}
            y={arrow.y}
            width={width}
            height={height}
            draggable
            onDragEnd={handleDragEnd}
            onClick={handleRotateArrow}
            rotation={arrow.rotation}
          />
  
    </React.Fragment>
  );
};

export default ArrowsComponent;




