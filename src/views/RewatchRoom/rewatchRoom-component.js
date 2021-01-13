import React, { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import {
  Typography,
  Backdrop,
  Grid,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import "./index.css";
import { useParams } from "react-router";
import Axios from "axios";
import { GameContext } from "../../contexts/game";
import RewatchGame from "../../components/RewatchRoom/rewatchGame-component";
import RewatchRoomTab from "../../components/RewatchRoom/rewatchRoomTab-component";

const useStyles = makeStyles((theme) => ({
  roomTab: {
    marginTop: theme.spacing(3),
  },
}));

export default function RewatchRoom() {
  const classes = useStyles();
  const { id } = useParams();

  const [game, setGame] = useState();

  const [chat, setChat] = useState();

  const [isLoadingPrompt, setLoadingPrompt] = useState(
    "Đang tải phòng chơi, vui lòng chờ"
  );

  const fetchData = useCallback(async () => {
    console.log("hello there");
    const result = await Axios.get(`${API.clientURL}/game-records/${id}`);
    const data = result.data;
    console.log(data);

    setGame(data.game);
    setChat(data.chat);
  }, [id]);

  useEffect(() => {
    fetchData();

    setLoadingPrompt(null);
  }, [fetchData]);

  const value = {
    game: game,
    chat: chat,
  };

  return (
    <GameContext.Provider value={value}>
      <div>
        {game ? (
          <div style={{ display: "flex" }}>
            <RewatchGame></RewatchGame>
            <div className={classes.roomTab}>
              <RewatchRoomTab></RewatchRoomTab>
            </div>
          </div>
        ) : (
          <></>
        )}

        <Backdrop
          open={isLoadingPrompt !== null}
          style={{ color: "#fff", zIndex: 100, justifyContent: "center" }}
        >
          <Grid container item justify="center">
            <Grid item xs={12}>
              <CircularProgress color="inherit" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" style={{ color: "white" }}>
                {isLoadingPrompt}
              </Typography>
            </Grid>
          </Grid>
        </Backdrop>
      </div>
    </GameContext.Provider>
  );
}
