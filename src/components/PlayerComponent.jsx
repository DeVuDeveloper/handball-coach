import React from 'react';
import { Circle, Text, Arrow } from 'react-konva';

const PlayerComponent = ({
  player,
  selectedPlayerIndex,
  onPlayerDrag,
  onPlayerClick,
  ballRadius,
  index,
  onUpdateArrowRotation,
}) => {
  const handleDragEnd = (e) => {
    onPlayerDrag(index, e);
  };

  const handleClick = (e) => {
    onPlayerClick(index, e);
  };

  const handleArrowDragEnd = (e) => {
    const newRotation = e.target.rotation();
    onUpdateArrowRotation(index, newRotation);
  };

  const playerLabels = ['GL', 'LB', 'SB', 'DB', 'LK', 'DK', 'PV'];

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
      <Text x={player.x - 7} y={player.y - 10} text={player.label} fontSize={14} fill="white" />

      {player.hasBall && (
        <Circle x={player.x} y={player.y - player.radius - ballRadius - 2} radius={ballRadius} fill="black" />
      )}
   <Arrow
  x={player.x}
  y={player.y}
  points={[0, 0, 27 * player.arrowDirection, 0]} // Promenite tačke na osnovu arrowDirection
  pointerLength={10}
  pointerWidth={10}
  fill="black"
  draggable
  resizable
  rotation={player.rotation}
  onDragEnd={handleArrowDragEnd}
/>


    </React.Fragment>
  );
};

export default PlayerComponent;



