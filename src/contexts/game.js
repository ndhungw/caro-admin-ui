import { createContext, useContext, useState } from "react";

export const GameContext = createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider(props) {
  const [game, setGame] = useState(props.game);

  const [playerNumber, setPlayerNumber] = useState(0);

  const gameActions = {};

  gameActions.setInitialGameState = (fetchedGame, fetchedPlayerNumber) => {
    setGame(fetchedGame);
    setPlayerNumber(fetchedPlayerNumber);
  };

  const value = {
    game: game,
    playerNumber: playerNumber,
    gameActions: gameActions,
  };

  return <GameContext.Provider value={value}></GameContext.Provider>;
}
