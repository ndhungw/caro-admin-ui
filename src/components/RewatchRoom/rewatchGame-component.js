import React from "react";
import RewatchBoard from "./rewatchBoard-component.js";

import { useGame } from "../../contexts/game.js";

import { Container } from "@material-ui/core";
import PlayerCard from "../PlayerCard/playerCard-component.js";

function RewatchGame() {
  const { game } = useGame();

  let winnerMessage;

  switch (game.winner) {
    case 1:
      winnerMessage = `${game.player1.username} has won`;
      break;

    case 2:
      winnerMessage = `${game.player2.username} has won`;
      break;

    case 3:
      winnerMessage = "Tie, both have won";
      break;

    default:
      break;
  }

  let nextTurnUser = "";
  if (game.playerMoveNext === 1) {
    nextTurnUser = game.player1.username;
  } else {
    nextTurnUser = game.player2.username;
  }

  return (
    <div className="game">
      <Container>
        <div>
          <h1>{winnerMessage}</h1>
        </div>

        <div style={{ display: "flex" }}>
          <div className="game-board">
            <RewatchBoard />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <PlayerCard
              username={game.player1.username}
              trophies={game.player1.trophies}
              won={game.player1.gamesWon}
              lost={game.player1.gamesLost}
            ></PlayerCard>
            <div style={{ flexGrow: 1 }} />
            <div style={{ flexGrow: 1 }} />
            <PlayerCard
              username={game.player2.username}
              trophies={game.player2.trophies}
              won={game.player2.gamesWon}
              lost={game.player2.gamesLost}
            ></PlayerCard>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default RewatchGame;
