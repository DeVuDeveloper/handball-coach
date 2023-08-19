import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import PlayerComponent from "./PlayerComponent";
import ArrowsComponent from "./ArrowsComponent";
import * as actions from "../actions/actions";
import { arrowsButtonsData } from "./arrowsButtonsData";
import TextAnnotationComponent from "./TextAnnotationComponent";
import ScreenshotButton from './ScreenshotButton';
import domtoimage from 'dom-to-image';
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
  const [arrows, setArrows] = useState([]);
  const [text, setText] = useState("");
  const [textAnnotations, setTextAnnotations] = useState([]);
  const [wireframeLines, setWireframeLines] = useState([]);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null)
  const numRows = 15;
  const numColumns = 30;
  const scaledWidthInPixels = window.innerWidth * 0.8;
  const scaledHeightInPixels = window.innerHeight * 0.6;
  const arrowWidth = 50;
  const arrowHeight = 80;
  const ballRadius = 7;
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
        if (color === "blue") {
          player.rotation = (player.rotation + 270) % 360;
        }
      }
    });

    setPlayers((prevPlayers) => [...prevPlayers, ...newPlayers]);
  };

  const handlePlayerRotate = (index) => {
    if (players[index].color === "blue") {
      const updatedPlayers = [...players];
      updatedPlayers[index].rotation =
        (updatedPlayers[index].rotation + 20) % 360;
      setPlayers(updatedPlayers);
    }
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

  const handleRemoveAllPlayers = () => {
    setPlayers([]);
  };

  const handleGenerateArrow = (src) => {
    const newArrow = {
      arrow: src,
      rotation: 0,
      x: 400,
      y: 300,
    };
  
    setArrows((prevArrows) => [...prevArrows, newArrow]);
  };

  const handleRemoveAllArrows = () => {
    setArrows([]);
  };

  const handleArrowsDrag = (src, x, y) => {
    const newArrow = {
      arrow: src,
      x: x - arrowWidth / 2,
      y: y - arrowHeight / 2,
    };

    setArrows((prevArrows) => [...prevArrows, newArrow]);
  };

  const handleRotateArrows = (index) => {
    const updatedArrows = [...arrows];
    updatedArrows[index].rotation = (updatedArrows[index].rotation + 20) % 360;
    setArrows(updatedArrows);
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

  const generateWireframe = () => {
    const lines = [];
    const metersPerField = 1;

    for (let i = 0; i <= numRows; i++) {
      const y = (i * metersPerField * scaledHeightInPixels) / numRows;
      const label = `Y${i * metersPerField}`;
      lines.push({
        points: [0, y, scaledWidthInPixels, y],
        stroke: "black",
        label,
      });
    }

    for (let i = 0; i <= numColumns; i++) {
      const x = (i * metersPerField * scaledWidthInPixels) / numColumns;
      const label = `X${i * metersPerField}`;
      lines.push({
        points: [x, 0, x, scaledHeightInPixels],
        stroke: "black",
        label,
      });
    }

    setWireframeLines(lines);
  };

  const removeWireframe = () => {
    setWireframeLines([]);
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

  const handleScreenshotClick = async () => {
    const elementToCapture = document.getElementById('screenshot-area');
  
    if (elementToCapture) {
      try {
        const screenshotBlob = await domtoimage.toBlob(elementToCapture);
        const screenshotUrl = URL.createObjectURL(screenshotBlob);
  
        const link = document.createElement('a');
        link.href = screenshotUrl;
        link.download = 'screenshot.png';
        link.click();
  
      } catch (error) {
        console.error('Greška prilikom snimanja slike:', error);
      }
    } else {
      console.error('Element sa ID-om "screenshot-area" nije pronađen.');
    }
  };
  

  return (
    <section className="container">
       
       <ScreenshotButton targetId="screenshot-area" onClick={handleScreenshotClick} />
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
      <div className="wireframe-button">
        <button className="action-button" onClick={generateWireframe}>
          Generiši wireframe
        </button>
        <button
          className="action-button remove-wireframe"
          onClick={removeWireframe}
        >
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

      <div className="buttons-icons">
        {arrowsButtonsData.map((buttonData, index) => (
          <button
            className="icons-buttons"
            key={`button_${index}`}
            onClick={() => handleGenerateArrow(buttonData.src)}
          >
            {buttonData.label}
          </button>
        ))}
        <button className="remove-icons" onClick={handleRemoveAllArrows}>
          Ukloni strelice
        </button>
      </div>
      <div className="handball-court-container" id="screenshot-area">
        <Stage
          width={scaledWidthInPixels}
          height={scaledHeightInPixels}
          className="Stage"
        >
          <Layer>
            {arrows.map((arrow, index) => (
              <ArrowsComponent
                key={`arrow_${index}`}
                arrow={arrow}
                onArrowDrag={handleArrowsDrag}
                width={arrowWidth}
                height={arrowHeight}
                handleRotateArrows={handleRotateArrows}
                index={index}
              />
            ))}

            {players.map((player, index) => (
              <PlayerComponent
                key={`player_${index}`}
                player={player}
                onPlayerDrag={handlePlayerDrag}
                ballRadius={ballRadius}
                index={index}
                onPlayerRotate={handlePlayerRotate}
                color={player.color}
                players={players}
                setPlayers={setPlayers}
                onPlayerClick={handlePlayerClick}
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
                <Line points={line.points} stroke={line.stroke} />
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
