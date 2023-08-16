import React, { useState, useEffect } from 'react';
import { Stage, Layer, Circle, Text, Line, Arrow, Transformer } from 'react-konva';
import './HandballCourt.css';
import p1Image from '../assets/p1.png';
import p2Image from '../assets/p2.png';
import URLImage from './URLImage';

const HandballCourt = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [selectedAnnotationIndex, setSelectedAnnotationIndex] = useState(null);
  const playerRadius = 15;
  const ballRadius = 7;
  const iconWidth = 100;
  const iconHeight = 100;

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

  const handleImageDrag = (e, src) => {
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();
    const newAnnotations = [...annotations];
    newAnnotations.push({
      type: 'image',
      image: src,
      x: position.x - iconWidth / 2,
      y: position.y - iconHeight / 2,
    });
    setAnnotations(newAnnotations);
  };

  const handleGeneratePlayers = (color) => {
    const newPlayers = generatePlayers(color);
    setPlayers((prevPlayers) => [...prevPlayers, ...newPlayers]);
  };

  const handleGenerateIcon = (src, x, y) => {
    const newAnnotations = [...annotations];
    newAnnotations.push({
      type: 'image',
      image: src,
      x: x - iconWidth / 2,
      y: y - iconHeight / 2,
    });
    setAnnotations(newAnnotations);
  };

  const handleRemoveAllPlayers = () => {
    setPlayers([]);
  };

  const handleRemoveAllIcons = () => {
    setAnnotations([]);
  };

  return (
    <section class="container">
<div>
      <button onClick={() => handleGeneratePlayers('blue')}>Generiši plave igrače</button>
      <button onClick={() => handleGeneratePlayers('red')}>Generiši crvene igrače</button>
      <button onClick={handleRemoveAllPlayers}>Ukloni sve igrače</button>
    </div><div>
        <button onClick={() => handleGenerateIcon(p1Image, 100, 100)}>Generiši ikonu 1</button>
        <button onClick={() => handleGenerateIcon(p2Image, 200, 200)}>Generiši ikonu 2</button>
        <button onClick={handleRemoveAllIcons}>Ukloni sve ikone</button>
      </div><div className="handball-court-container">

        <Stage width={800} height={500} className="Stage" onClick={handleStageClick}>
          <Layer>
            {players.map((player, index) => (
              <React.Fragment key={`player_${index}`}>
                <Circle
                  x={player.x}
                  y={player.y}
                  radius={player.radius}
                  fill={player.color}
                  className={`Player ${selectedPlayerIndex === index ? 'Selected' : ''}`}
                  draggable
                  onDragEnd={(e) => handlePlayerDrag(index, e)}
                  onClick={(e) => handlePlayerClick(index, e)} />
                <Text
                  x={player.x - 7}
                  y={player.y - 10}
                  text={player.number.toString()}
                  fontSize={14}
                  fill="white" />
                {player.hasBall && (
                  <Circle
                    x={player.x}
                    y={player.y - player.radius - ballRadius - 2}
                    radius={ballRadius}
                    fill="black" />
                )}
              </React.Fragment>
            ))}

            {annotations.map((annotation, index) => {
              if (annotation.type === 'image') {
                return (
                  <URLImage
                    key={index}
                    src={annotation.image}
                    x={annotation.x}
                    y={annotation.y}
                    width={iconWidth}
                    height={iconHeight}
                    draggable
                    onDragEnd={handleImageDrag} />
                );
              }
              
              return null;
            })}

          </Layer>
        </Stage>

      </div>
      </section>
  );
};

export default HandballCourt;














