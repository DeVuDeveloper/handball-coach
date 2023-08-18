export const generatePlayers = (color, playerLabels) => {
  const offset = 20;
  let startX;

  if (color === 'blue') {
    startX = offset + 540;
  } else {
    startX = 480 - offset;
  }

  const arrowDirection = color === 'red' ? 1 : -1;

  return Array.from({ length: playerLabels.length }, (_, index) => ({
    x: startX,
    y: 90 + index * 50,
    radius: 15,
    color,
    number: index + 1,
    hasBall: false,
    path: [],
    rotation: 0,
    label: playerLabels[index],
    arrowDirection,
  }));
};

  

export const setSelectedAnnotationIndex = (index) => ({
  type: "SET_SELECTED_ANNOTATION_INDEX",
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

export const handlePlayerClick = (
  players,
  setPlayers,
  selectedPlayerIndex,
  setSelectedPlayerIndex,
  index,
  e
) => {
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


