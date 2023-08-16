import React, { useState, useEffect } from 'react';
import { Stage, Layer, Circle, Text, Line, Arrow, Transformer } from 'react-konva';
import './HandballCourt.css';
import p1Image from '../assets/p1.png';
import URLImage from './URLImage';


const HandballCourt = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [selectedAnnotationIndex, setSelectedAnnotationIndex] = useState(null);
  const playerRadius = 15;
  const ballRadius = 7;

  const generatePlayers = (color) => {
    const offset = 20;
    let startX;
    
    if (color === 'blue') {
      startX = offset + 300;
    } else {
      startX = 600 - offset;
    }
    
    return Array.from({ length: 7 }, (_, index) => ({
      x: startX,
      y: 80 + index * 50,
      radius: playerRadius,
      color,
      number: index + 1,
      hasBall: false,
      path: [],
    }));
  };
  
  const handlePlayerDrag = (index, e) => {
    const newPlayers = [...players];
    newPlayers[index] = {
      ...newPlayers[index],
      x: e.target.x(),
      y: e.target.y(),
    };
    setPlayers(newPlayers);
  };
  
  const handlePlayerClick = (index, e) => {
    if (e.evt.button === 2) {
      removePlayer(index);
    } else {
      togglePlayerBall(index);
    }
  };
  
  const removePlayer = (index) => {
    const updatedPlayers = players.filter((player, i) => i !== index);
    setPlayers(updatedPlayers);
    setSelectedPlayerIndex(null);
  };
  
  const togglePlayerBall = (index) => {
    setPlayers(
      players.map((player, i) =>
        i === index ? { ...player, hasBall: !player.hasBall } : player
      )
    );
    setSelectedPlayerIndex(index);
  };

  const handleAnnotationClick = (index) => {
    setSelectedAnnotationIndex(index);
  };

  const handleStageClick = (e) => {
    if (selectedAnnotationIndex !== null) {
      const newAnnotations = [...annotations];
      const annotation = newAnnotations[selectedAnnotationIndex];
      annotation.points.push(e.evt.layerX, e.evt.layerY);
      setAnnotations(newAnnotations);
      setSelectedAnnotationIndex(null);
    }
  };

  const handleAnnotationContextMenu = (e, index) => {
    e.evt.preventDefault();
    removeAnnotation(index);
  };

  const removeAnnotation = (index) => {
    const updatedAnnotations = annotations.filter((annotation, i) => i !== index);
    setAnnotations(updatedAnnotations);
  };

  const iconWidth = 60; // Adjust this to your desired width
  const iconHeight = 60; // Adjust this to your desired height

  const handleImageDrag = (e) => {
    console.log('Image Dragged');
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();
    const newAnnotations = [...annotations];
    newAnnotations.push({
      type: 'image',
      image: p1Image,
      x: position.x - iconWidth / 2,
      y: position.y - iconHeight / 2,
    });
    setAnnotations(newAnnotations);
  };

  useEffect(() => {
    const bluePlayers = generatePlayers('blue');
    const redPlayers = generatePlayers('red');
    setPlayers([...bluePlayers, ...redPlayers]);
  }, []);

  return (
    <div className="handball-court-container">
      <Stage width={800} height={500} className="Stage" onClick={handleStageClick}>
        <Layer>
          {players.map((player, index) => (
            <Circle
              key={index}
              x={player.x}
              y={player.y}
              radius={player.radius}
              fill={player.color}
              className={`Player ${selectedPlayerIndex === index ? 'Selected' : ''}`}
              draggable
              onDragEnd={(e) => handlePlayerDrag(index, e)}
              onClick={(e) => handlePlayerClick(index, e)}
            />
          ))}

<URLImage
            src={p1Image}
            x={100} // initial x position
            y={100} // initial y position
            width={iconWidth}
            height={iconHeight}
            draggable
            onDragEnd={handleImageDrag}
          />
  
          {players.map((player, index) => (
            <Text
              key={index}
              x={player.x - 7}
              y={player.y - 10}
              text={player.number.toString()}
              fontSize={14}
              fill="white"
            />
          ))}
  
          {players.map((player, index) => (
            player.hasBall && (
              <Circle
                key={`ball_${index}`}
                x={player.x}
                y={player.y - player.radius - ballRadius - 2}
                radius={ballRadius}
                fill="black"
              />
            )
          ))}
  
          {annotations.map((annotation, index) => {
            if (annotation.type === 'line') {
              return (
                <React.Fragment key={`annotation_${index}`}>
                  <Line
                    points={annotation.points}
                    stroke={annotation.color}
                    strokeWidth={2}
                    onClick={() => handleAnnotationClick(index)}
                    onContextMenu={(e) => handleAnnotationContextMenu(e, index)}
                  />
                  {selectedAnnotationIndex === index && (
                    <Transformer
                      nodes={[annotation]}
                      anchorStroke="black"
                      borderStroke="black"
                      rotateEnabled={false}
                    />
                  )}
                </React.Fragment>
              );
            } else if (annotation.type === 'arrow') {
              return (
                <React.Fragment key={`annotation_${index}`}>
                  <Arrow
                    points={annotation.points}
                    stroke={annotation.color}
                    strokeWidth={2}
                    pointerLength={10}
                    pointerWidth={10}
                    onClick={() => handleAnnotationClick(index)}
                    onContextMenu={(e) => handleAnnotationContextMenu(e, index)}
                  />
                  {selectedAnnotationIndex === index && (
                    <Transformer
                      nodes={[annotation]}
                      anchorStroke="black"
                      borderStroke="black"
                      rotateEnabled={false}
                    />
                  )}
                </React.Fragment>
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default HandballCourt;












