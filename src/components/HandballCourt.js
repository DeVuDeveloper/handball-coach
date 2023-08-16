import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import PlayerComponent from "./PlayerComponent";
import AnnotationComponent from "./AnnotationComponent";
import * as actions from "../actions/actions";
import { imageButtonsData } from "./imageButtonsData";
import TextAnnotationComponent from "./TextAnnotationComponent";
import ArrowImage from "./ArrowImage";
import arrow1 from "../assets/arrow.png";

import "./HandballCourt.css";

const HandballCourt = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [selectedAnnotationIndex, setSelectedAnnotationIndex] = useState(null);
  const [arrows, setArrows] = useState([]);
  const [text, setText] = useState("");
  const [textAnnotations, setTextAnnotations] = useState([]);

  const ballRadius = 7;
  const iconWidth = 170;
  const iconHeight = 170;

  const handleGeneratePlayers = (color) => {
    const newPlayers = actions.generatePlayers(color);
    setPlayers((prevPlayers) => [...prevPlayers, ...newPlayers]);
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

  return (
    <section className="container">
      <div className="text-form">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Unesite tekst"
        />
        <button onClick={() => handleTextSubmit(400, 400)}>Dodaj tekst</button>
      </div>

      <div>
        <button onClick={() => handleGeneratePlayers("blue")}>
          Generiši plave igrače
        </button>
        <button onClick={() => handleGeneratePlayers("red")}>
          Generiši crvene igrače
        </button>
        <button onClick={handleRemoveAllPlayers}>Ukloni sve igrače</button>
      </div>

      <button onClick={() => handleAddArrow({ x: 400, y: 400 })}>
        Dodaj strelicu
      </button>

      <div className="buttons-icons">
        {imageButtonsData.map((buttonData, index) => (
          <button
            key={`button_${index}`}
            onClick={() =>
              handleGenerateIcon(buttonData.src, buttonData.x, buttonData.y)
            }
          >
            {buttonData.label}
          </button>
        ))}
        <button onClick={handleRemoveAllIcons}>Ukloni sve ikone</button>
      </div>
      <div className="handball-court-container">
        <Stage
          width={800}
          height={500}
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
              />
            ))}
            {annotations.map((annotation, index) => (
              <AnnotationComponent
                key={`annotation_${index}`}
                annotation={annotation}
                onImageDrag={handleImageDrag}
                iconWidth={iconWidth}
                iconHeight={iconHeight}
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
          </Layer>
        </Stage>
      </div>
    </section>
  );
};

export default HandballCourt;
