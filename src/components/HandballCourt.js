import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Text} from "react-konva";
import PlayerComponent from "./PlayerComponent";
import AnnotationComponent from "./AnnotationComponent";
import * as actions from "../actions/actions";
import { imageButtonsData } from "./imageButtonsData";
import TextAnnotationComponent from "./TextAnnotationComponent";
import ArrowImage from "./ArrowImage";
import arrow1 from "../assets/arrow.png";
import "./HandballCourt.css";

const initialPlayerPositions = {
  blue: {
    GL: { x: 855, y: 280 },
    LB: { x: 490, y: 480 },
    SB: { x: 480, y: 280 },
    DB: { x: 490, y: 130 },
    LK: { x: 430, y: 510 },
    DK: { x: 430, y: 80 },
    P: { x: 430, y: 280 },
   
  },
  red: {
    GL: { x: 170, y: 280 },
    Lb: { x: 250, y: 80 },
    CH: { x: 320, y: 280 },
    Db: { x: 250, y: 480 },
    LH: { x: 300, y: 180 },
    DH: { x: 300, y: 380 },
    PC: { x: 370, y: 280 },
  },
};

const HandballCourt = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [selectedAnnotationIndex] = useState(null);
  const [arrows, setArrows] = useState([]);
  const [text, setText] = useState("");
  const [textAnnotations, setTextAnnotations] = useState([]);
  const [rotatingPlayerIndex, setRotatingPlayerIndex] = useState(null);

  const [wireframeLines, setWireframeLines] = useState([]);


  const iconSize = 50;

  const numRows = 15; 
  const numColumns = 30; 

  const scaledWidthInPixels = window.innerWidth * 0.8;
  const scaledHeightInPixels = window.innerHeight * 0.6;

  const generateWireframe = () => {
    const lines = [];
  
    const metersPerField = 1;
  
    for (let i = 0; i <= numRows; i++) {
      const y = i * metersPerField * scaledHeightInPixels / numRows;
      const label = `Y${i * metersPerField}`;
      lines.push({ points: [0, y, scaledWidthInPixels, y], stroke: "black", label });
    }
  
    for (let i = 0; i <= numColumns; i++) {
      const x = i * metersPerField * scaledWidthInPixels / numColumns;
      const label = `X${i * metersPerField}`;
      lines.push({ points: [x, 0, x, scaledHeightInPixels], stroke: "black", label });
    }
  
    setWireframeLines(lines);
  };
  
  const ballRadius = 7;
  const iconWidth = 170;
  const iconHeight = 170;

  const bluePlayerLabels = ["GL", "LB", "SB", "DB", "LK", "DK", "P"];
  const redPlayerLabels = ["GL", "Lb", "CH", "Db", "LH", "DH", "PC"];

  const handleGeneratePlayers = (color) => {
    const playerLabels = color === "blue" ? bluePlayerLabels : redPlayerLabels;
    const newPlayers = actions.generatePlayers(color, playerLabels);
  
    newPlayers.forEach((player) => {
      const initialPosition = initialPlayerPositions[color][player.label];
      if (initialPosition) {
        player.x = initialPosition.x;
        player.y = initialPosition.y;
      }
      // Ovde možete takođe postaviti rotaciju ako je potrebno
    });
  
    setPlayers((prevPlayers) => [...prevPlayers, ...newPlayers]);
  
    generateWireframe();
  };

  const handleRemoveAllPlayers = () => {
    setPlayers([]);
  };

  const handleGenerateIcon = (src, x, y) => {
    const newAnnotation = {
      type: "image",
      image: src,
      x: x - iconWidth / 2,
      y: y - iconHeight / 2,
    };

    setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
  };

  const handleRemoveAllIcons = () => {
    setAnnotations([]);
  };

  const handlePlayerDrag = (index, e) => {
    actions.handlePlayerDrag(players, setPlayers, index, e);
  };

  const handlePlayerClick = (index, e) => {
    actions.handlePlayerClick(
      players,
      setPlayers,
      selectedPlayerIndex,
      setSelectedPlayerIndex,
      index,
      e
    );
  };

  const handleStageClick = (e) => {
    actions.handleStageClick(
      e,
      selectedAnnotationIndex,
      annotations,
      setAnnotations
    );
  };

  const handleImageDrag = (src, x, y) => {
    const newAnnotation = {
      type: "image",
      image: src,
      x: x - iconWidth / 2,
      y: y - iconHeight / 2,
    };

    setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
  };

  const handleTextSubmit = (x, y) => {
    const newTextAnnotation = {
      type: "text",
      text,
      x,
      y,
    };
    setTextAnnotations((prevTextAnnotations) => [
      ...prevTextAnnotations,
      newTextAnnotation,
    ]);
    setText("");
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTextDrag = (index, x, y) => {
    const updatedTextAnnotations = [...textAnnotations];
    updatedTextAnnotations[index].x = x;
    updatedTextAnnotations[index].y = y;
    setTextAnnotations(updatedTextAnnotations);
  };

  const handleAddArrow = (newArrow) => {
    setArrows((prevArrows) => [...prevArrows, newArrow]);
  };

  const handlePlayerRotate = (index) => {
    if (players[index].color === "blue") {
      const updatedPlayers = [...players];
      updatedPlayers[index].rotation =
        (updatedPlayers[index].rotation + 90) % 360;
      setPlayers(updatedPlayers);
    }
  };

  const handleRotateArrowClick = (index) => {
    if (rotatingPlayerIndex === index) {
      setRotatingPlayerIndex(null);
    } else {
      setRotatingPlayerIndex(index);
    }
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const removeWireframe = () => {
    setWireframeLines([]);
  };

  return (
    <section className="container">
      <div className="text-form">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Unesite tekst"
        />
        <button
          className="action-button"
          onClick={() => handleTextSubmit(400, 400)}
        >
          Dodaj tekst
        </button>
      </div>
<div class="wireframe-button">
      <button className="action-button" onClick={generateWireframe}>
  Generiši wireframe
</button>
<button className="action-button remove-wireframe" onClick={removeWireframe}>
  Ukloni wireframe
</button>
</div>

      <div className="players-buttons">
        <button
          className="player-button"
          onClick={() => handleGeneratePlayers("blue")}
        >
          Generiši igrače napada
        </button>
        <button
          className="player-button"
          onClick={() => handleGeneratePlayers("red")}
        >
          Generiši odbrambene igrače
        </button>
        <button
          className="remove-players-button"
          onClick={handleRemoveAllPlayers}
        >
          Ukloni sve igrače
        </button>
      </div>

      <button
        className="action-button"
        onClick={() => handleAddArrow({ x: 50, y: 50 })}
      >
        Dodaj strelicu
      </button>

      <div className="buttons-icons">
        {imageButtonsData.map((buttonData, index) => (
          <button
            className="icons-buttons"
            key={`button_${index}`}
            onClick={() =>
              handleGenerateIcon(buttonData.src, buttonData.x, buttonData.y)
            }
          >
            {buttonData.label}
          </button>
        ))}
        <button className="remove-icons" onClick={handleRemoveAllIcons}>
          Ukloni sve ikone
        </button>
      </div>
      <div className="handball-court-container">
        <Stage
           width={scaledWidthInPixels}
           height={scaledHeightInPixels}
          className="Stage"
          onClick={handleStageClick}
        >
          <Layer>
            {players.map((player, index) => (
              <PlayerComponent
                key={`player_${index}`}
                player={player}
                selectedPlayerIndex={selectedPlayerIndex}
                onPlayerDrag={handlePlayerDrag}
                onPlayerClick={handlePlayerClick}
                ballRadius={ballRadius}
                index={index}
                onRotateArrowClick={handleRotateArrowClick}
                rotatingPlayerIndex={rotatingPlayerIndex}
                onPlayerRotate={handlePlayerRotate}
                color={player.color}
                players={players}
                setPlayers={setPlayers}
              />
            ))}
            {annotations.map((annotation, index) => (
              <AnnotationComponent
                key={`annotation_${index}`}
                annotation={annotation}
                onImageDrag={handleImageDrag}
                iconSize={iconSize}
              />
            ))}

            {arrows.map((arrow, index) => (
              <ArrowImage
                key={`arrow_${index}`}
                src={arrow1}
                image={arrow1}
                x={arrow.x}
                y={arrow.y}
                width={50}
                height={50}
                onAddArrow={handleAddArrow}
              />
            ))}

            {textAnnotations.map((textAnnotation, index) => (
              <TextAnnotationComponent
                key={`text_annotation_${index}`}
                textAnnotation={textAnnotation}
                index={index}
                onTextDrag={handleTextDrag}
              />
            ))}

{wireframeLines.map((line, index) => (
  <React.Fragment key={`wireframe_${index}`}>
    <Line
      points={line.points}
      stroke={line.stroke}
    />
    <Text
      text={line.label}
      x={line.points[0] + 5}
      y={line.points[1] + 5}
      fill="black"
      fontSize={12}
    />
  </React.Fragment>
))}
          </Layer>
        </Stage>
      </div>
    </section>
  );
};

export default HandballCourt;
