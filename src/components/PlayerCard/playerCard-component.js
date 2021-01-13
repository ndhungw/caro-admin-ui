import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { mdiTrophy } from "@mdi/js";

import defaultAvatar from "../../assets/img/logo.png";
import { Box, Paper, SvgIcon } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 150,
  },

  paper: {
    maxWidth: 150,
    marginTop: 10,
    marginBottom: 10,
  },

  cardContent: {
    paddingLeft: 6,
    paddingRight: 10,
  },
  image: {
    height: 100,
    width: 100,
    alignContent: "center",
    marginRight: 10,
    marginLeft: 10,
  },

  usernameText: {
    marginBottom: 10,
  },

  row: {
    display: "flex",
    justifyContent: "center",
  },

  trophiesText: {
    marginLeft: 5,
  },
});

export default function PlayerCard({
  username,
  profileImage,
  trophies,
  won,
  lost,
}) {
  const classes = useStyles();

  return (
    <Box
      border={2}
      className={classes.root}
      style={{ marginLeft: 10 }}
      borderRadius={10}
    >
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.row}>
          <img
            src={profileImage ? profileImage : defaultAvatar}
            className={classes.image}
            alt="player1 avatar"
          ></img>
        </div>

        <Typography align="center" className={classes.usernameText}>
          {username}
        </Typography>
        <div className={classes.row}>
          <SvgIcon>
            <path d={mdiTrophy} />
          </SvgIcon>

          {/* <Icon>
          <img src={mdiTrophy}></img>
        </Icon> */}

          <Typography className={classes.trophiesText}>{trophies}</Typography>
        </div>

        <Typography align="center">{`Won: ${won}`}</Typography>

        <Typography align="center">{`Lost: ${lost}`}</Typography>
      </Paper>
    </Box>
  );
}
