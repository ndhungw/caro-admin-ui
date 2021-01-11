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
// from this project
import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";
// import SearchBar from "../../components/SearchBar/SearchBar";
import { SearchIcon } from "@material-ui/data-grid";
import clsx from "clsx";
import axios from "axios";

import API from "../../services/api";

// function createData(username, providers, created, updated, isActive) {
//   return { username, providers, created, updated, isActive };
// }

// const data = [
//   createData("Oreo", "GMail", Date.now(), Date.now(), true),
//   createData(
//     "Cupcake",
//     "GMail",
//     Date.UTC(2021, 11, 12, 3, 0, 0),
//     Date.now(),
//     true
//   ),
//   createData(
//     "Donut Cupcake Blah so many characters",
//     "GMail",
//     Date.now(),
//     Date.now(),
//     false
//   ),
//   createData(
//     "Eclair",
//     "GMail",
//     Date.UTC(2021, 11, 12, 3, 0, 0),
//     Date.now(),
//     true
//   ),
//   createData("FrozenYoghurt", "GMail", Date.now(), Date.now(), true),
//   createData(
//     "Gingerbread",
//     "GMail",
//     Date.UTC(2021, 11, 12, 3, 0, 0),
//     Date.now(),
//     true
//   ),
//   createData("Honeycomb", "GMail", Date.now(), Date.now(), true),
//   createData(
//     "Ice cream sandwich",
//     "GMail",
//     Date.UTC(2021, 11, 12, 3, 0, 0),
//     Date.now(),
//     true
//   ),
//   createData("Jelly Bean", "GMail", Date.now(), Date.now(), true),
//   createData(
//     "Jelly Bean",
//     "GMail",
//     Date.UTC(2021, 11, 12, 3, 0, 0),
//     Date.now(),
//     true
//   ),
//   createData("KitKat", "GMail", Date.now(), Date.now(), true),
//   createData(
//     "Lollipop",
//     "GMail",
//     Date.UTC(2021, 11, 12, 3, 0, 0),
//     Date.now(),
//     true
//   ),
//   createData("Marshmallow", "GMail", Date.now(), Date.now(), true),
//   createData(
//     "Nougat",
//     "GMail",
//     Date.UTC(2021, 11, 12, 3, 0, 0),
//     Date.now(),
//     true
//   ),
// ];

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

export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [usersOnTable, setUsersOnTable] = React.useState([]);

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
    // call API to get all users
    await getAllUsers();
    refreshData(); // if admin is searching someone, just show that user. If not, show all
  };

  const refreshData = () => {
    const searchText = searchTextRef.current.value;

    if (!searchText) {
      // show all users
      setUsersOnTable(users);
    } else {
      let updatedList = [];
      if (searchText.toLowerCase() === "disabled") {
        // show disabled user
        updatedList = users.filter((user) => user.active === false);
      } else if (searchText.toLowerCase() === "enabled") {
        // show enabled user
        updatedList = users.filter((user) => user.active === true);
      } else {
        // show a specific user
        updatedList = users.filter(
          (user) =>
            user.username.toLowerCase() === searchText.toLowerCase() ||
            user.email.toLowerCase() === searchText.toLowerCase() ||
            user.firstName.toLowerCase() === searchText.toLowerCase() ||
            user.lastName.toLowerCase() === searchText.toLowerCase()
        );
      }
      setUsersOnTable(updatedList);
    }
  };

  const getAllUsers = async () => {
    const response = await axios.get(`${API.url}/api/client-users`);
    const usersResponse = response.data;
    setUsers(usersResponse);
    console.log(usersResponse);
  };

  React.useEffect(() => {
    getAllUsers();
  }, []);

  React.useEffect(() => {
    setUsersOnTable(users);
  }, [users]);

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
                  placeholder="Search by username, email, first/last/full name or disabled/enabled"
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
          <EnhancedTable
            users={usersOnTable}
            handleReloadClick={handleReloadClick}
          />
        </Paper>
      </Container>
    </div>
  );
}
