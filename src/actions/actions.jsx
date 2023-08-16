export const generatePlayers = (color) => {
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
      radius: 15,
      color,
      number: index + 1,
      hasBall: false,
      path: [],
    }));
  };

  export const setSelectedAnnotationIndex = (index) => ({
  type: 'SET_SELECTED_ANNOTATION_INDEX',
  payload: index,
});
  
  export const handlePlayerDrag = (players, setPlayers, index, e) => {
    const newPlayers = [...players];
    newPlayers[index] = {
      ...newPlayers[index],
      x: e.target.x(),
      y: e.target.y(),
    };
    setPlayers(newPlayers);
  };
  
  export const handlePlayerClick = (players, setPlayers, selectedPlayerIndex, setSelectedPlayerIndex, index, e) => {
    if (e.evt.button === 2) {
      const updatedPlayers = players.filter((player, i) => i !== index);
      setPlayers(updatedPlayers);
      setSelectedPlayerIndex(null);
    } else {
      setPlayers(
        players.map((player, i) =>
          i === index ? { ...player, hasBall: !player.hasBall } : player
        )
      );
      setSelectedPlayerIndex(index);
    }
  };
  
  export const handleAnnotationClick = (index) => {
    setSelectedAnnotationIndex(index);
  };
  
  export const handleStageClick = (e, selectedAnnotationIndex, annotations, setAnnotations) => {
    if (selectedAnnotationIndex !== null) {
      const newAnnotations = [...annotations];
      const annotation = newAnnotations[selectedAnnotationIndex];
      annotation.points.push(e.evt.layerX, e.evt.layerY);
      setAnnotations(newAnnotations);
      setSelectedAnnotationIndex(null);
    }
  };
  
  export const handleAnnotationContextMenu = (e, index, annotations, setAnnotations) => {
    e.evt.preventDefault();
    const updatedAnnotations = annotations.filter((annotation, i) => i !== index);
    setAnnotations(updatedAnnotations);
  };
  
  export const removeAnnotation = (index, annotations, setAnnotations) => {
    const updatedAnnotations = annotations.filter((annotation, i) => i !== index);
    setAnnotations(updatedAnnotations);
  };
  

  
 
  