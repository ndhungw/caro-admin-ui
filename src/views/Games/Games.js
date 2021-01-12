import React from "react";
import {
  Container,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import ReplayIcon from "@material-ui/icons/Replay";
import ClearIcon from "@material-ui/icons/Clear";
import { SearchIcon } from "@material-ui/data-grid";
// from this project
import EnhancedTableGame from "../../components/EnhancedTableGame/EnhancedTableGame";
import API from "../../services/api";
//
import clsx from "clsx";
import axios from "axios";

// roomId, player1, player2, winner, createdAt, (history), (chatHistory)
function createData(roomId, player1, player2, winner, createdAt, chatHistory) {
  return { roomId, player1, player2, winner, createdAt, chatHistory };
}

const data = [
  createData(
    "000",
    "user001",
    "user002",
    1,
    new Date(Date.now()).toLocaleString(),
    null /* chat history will be implement later */
  ),
  createData(
    "000",
    "user001",
    "user002",
    2,
    new Date(Date.now()).toLocaleString(),
    null /* chat history will be implement later */
  ),
  createData(
    "001",
    "user001",
    "user003",
    2,
    new Date(Date.now()).toLocaleString(),
    null /* chat history will be implement later */
  ),
];

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
  },
  toolbarTop: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    backgroundColor: "#fafafa",
  },
  reloadIconButton: {
    backgroundColor: "#fafafa",
    marginLeft: theme.spacing(2),
  },
  reloadIcon: {
    color: "#1d1f23",
  },
  //
  searchBar: {
    width: "100%",
    margin: theme.spacing(2, 0),
    borderRadius: 8,
    backgroundColor: "#e6e6e6",
  },
  searchBarFocused: {
    backgroundColor: "#fff",
  },
  search: {
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    margin: theme.spacing(0, 2),
  },
  inputBase: {
    width: "100%",
  },
}));

export default function Games() {
  const classes = useStyles();
  const [games, setGames] = React.useState([]);
  const [gamesOnTable, setGamesOnTable] = React.useState([]);

  // search bar things
  const [isSearchBarFocused, setIsSearchBarFocused] = React.useState(false);
  const searchTextRef = React.useRef();

  const handleClear = () => {
    searchTextRef.current.value = "";
    searchTextRef.current.focus();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed!", searchTextRef.current.value);
      searchTextRef.current.blur();

      refreshData();
    }
  };
  //

  const handleReloadClick = async () => {
    // call API to get all games
    await getAllGames();
    refreshData(); // if admin is searching someone, just show that user. If not, show all
  };

  const refreshData = () => {
    const searchText = searchTextRef.current.value;

    if (!searchText) {
      // show all games
      setGamesOnTable(games);
    } else {
      let updatedList = [];
      if (searchText.toLowerCase() === "disabled") {
        // show disabled user
        updatedList = games.filter((user) => user.active === false);
      } else if (searchText.toLowerCase() === "enabled") {
        // show enabled user
        updatedList = games.filter((user) => user.active === true);
      } else {
        // show a specific user
        updatedList = games.filter(
          (game) =>
            game.roomId.toLowerCase() === searchText.toLowerCase() ||
            game.email.toLowerCase() === searchText.toLowerCase() ||
            game.firstName.toLowerCase() === searchText.toLowerCase() ||
            game.lastName.toLowerCase() === searchText.toLowerCase()
        );
      }
      setGamesOnTable(updatedList);
    }
  };

  const getAllGames = async () => {
    // const response = await axios.get(`${API.url}/api/game`);
    // const gamesResponse = response.data;
    // console.log(gamesResponse);
    // setGames(gamesResponse);
    setGames(data);
  };

  React.useEffect(() => {
    // getAllGames();
  }, []);

  React.useEffect(() => {
    setGamesOnTable(games);
  }, [games]);

  return (
    <div>
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <div className={classes.toolbarTop}>
            {/* Search bar */}
            <Paper
              onClick={() => setIsSearchBarFocused(true)}
              onBlur={() => setIsSearchBarFocused(false)}
              className={clsx(classes.searchBar, {
                [classes.searchBarFocused]: isSearchBarFocused,
              })}
            >
              <div className={classes.search}>
                <SearchIcon className={classes.searchIcon} />
                <InputBase
                  className={classes.inputBase}
                  placeholder="Search by roomId, email, first/last/full name or disabled/enabled"
                  inputRef={searchTextRef}
                  onKeyPress={handleKeyPress}
                />
                <IconButton>
                  <ClearIcon onClick={handleClear} />
                </IconButton>
              </div>
            </Paper>

            {/* Reload */}
            <IconButton
              aria-label="reload"
              variant="contained"
              onClick={handleReloadClick}
              className={classes.reloadIconButton}
            >
              <Tooltip title="Reload">
                <ReplayIcon
                  className={classes.reloadIcon}
                  onClick={handleReloadClick}
                />
              </Tooltip>
            </IconButton>
          </div>
          <EnhancedTableGame
            games={gamesOnTable}
            handleReloadClick={handleReloadClick}
          />
        </Paper>
      </Container>
    </div>
  );
}
