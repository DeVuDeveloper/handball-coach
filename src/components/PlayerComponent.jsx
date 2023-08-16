import React from 'react';
import { Circle, Text } from 'react-konva';

const PlayerComponent = ({
  player,
  selectedPlayerIndex,
  onPlayerDrag,
  onPlayerClick,
  ballRadius,
  index, // Dodato ovde
}) => {
  const handleDragEnd = (e) => {
    onPlayerDrag(index, e);
  };

  const handleClick = (e) => {
    onPlayerClick(index, e);
  };

  return (
    <React.Fragment>
      <Circle
        x={player.x}
        y={player.y}
        radius={player.radius}
        fill={player.color}
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
       
        opacity={0.8}
        draggable
      
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
       
        className={`Player ${selectedPlayerIndex === index ? 'Selected' : ''}`}
       
        onDragEnd={handleDragEnd}
        onClick={handleClick}
      />
      <Text x={player.x - 7} y={player.y - 10} text={player.number.toString()} fontSize={14} fill="white" />
      {player.hasBall && (
        <Circle x={player.x} y={player.y - player.radius - ballRadius - 2} radius={ballRadius} fill="black" />
      )}
    </React.Fragment>
  );
};

export default PlayerComponent;

