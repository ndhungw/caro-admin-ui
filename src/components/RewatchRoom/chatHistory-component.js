import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useGame } from "../../contexts/game";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    maxWidth: 400,
    display: "grid",
    gridTemplateRows: "1fr 45px",
    gridTemplateColumns: "1fr",
  },
  msgContainer: {
    marginBottom: theme.spacing(1),
    display: "flex",
    flexFlow: "column",
    overflow: "auto",
    maxHeight: 500,
  },

  message: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  bottomBar: {
    gridRow: "5/6",
    display: "flex",
  },
  inputContainer: {
    width: "100%",
  },
  inputBase: {
    width: "100%",
    padding: theme.spacing(1, 2),
    backgroundColor: "#f0f2f5",
    borderRadius: theme.spacing(16),
  },
  buttonSend: {
    marginLeft: theme.spacing(1),
    color: "#0099ff",
  },
}));

export default function ChatHistory() {
  const { chat } = useGame();

  console.log(chat);

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Paper elevation={0} className={classes.msgContainer}>
        {chat ? (
          <div>
            {chat.messages.map((e) => {
              return (
                <Typography className={classes.message}>
                  {`${e.username}: ${e.message}`}
                </Typography>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </Paper>
    </Paper>
  );
}
