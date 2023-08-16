import React from "react";
import { Circle, Text, RegularPolygon } from "react-konva";

import ball from "../assets/ball.png";
import URLImage from "./URLImage";

const PlayerComponent = ({
  player,
  selectedPlayerIndex,
  onPlayerDrag,
  onPlayerClick,
  ballRadius,
  color,
  index,
}) => {
  const handleDragEnd = (e) => {
    onPlayerDrag(index, e);
  };

  const handleClick = (e) => {
    onPlayerClick(index, e);
  };

  return (
    <React.Fragment>
      {color === "blue" ? (
        <RegularPolygon
          x={player.x}
          y={player.y}
          sides={3}
          radius={player.radius * 1.4}
          fill={player.color}
          opacity={0.8}
          draggable
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
          className={`Player ${selectedPlayerIndex === index ? "Selected" : ""}`}
          onDragEnd={handleDragEnd}
          onClick={handleClick}
          rotation={270}
        />
      ) : (
        <Circle
          x={player.x}
          y={player.y}
          radius={player.radius * 1.1}
          fill={player.color}
          opacity={0.8}
          draggable
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
          className={`Player ${selectedPlayerIndex === index ? "Selected" : ""}`}
          onDragEnd={handleDragEnd}
          onClick={handleClick}
        />
      )}
      <Text
        x={player.x - 7}
        y={player.y - 7}
        text={player.label}
        fontSize={11}
        fill={player.color === "blue" ? "white" : "black"} // Promenjeno boja teksta na osnovu boje igrača
      />

      {player.hasBall && (
        <URLImage
          src={ball}
          x={player.x - ballRadius - 10}
          y={player.y - player.radius - ballRadius - 10}
          width={ballRadius * 2.8}
          height={ballRadius * 2.8}
          image={ball}
        />
      )}
    </React.Fragment>
  );
};

export default PlayerComponent;
