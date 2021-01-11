import React from "react";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
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

export default function SearchBar({ reloadUserList }) {
  const classes = useStyles();
  const [isFocused, setIsFocused] = React.useState(false);
  const searchTextRef = React.useRef();

  const handleClear = () => {
    searchTextRef.current.value = "";
    searchTextRef.current.focus();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed!", searchTextRef.current.value);
      searchTextRef.current.blur();

      // call API to reload user data
      reloadUserList(searchTextRef.current.value);
    }
  };

  return (
    <Paper
      onClick={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={clsx(classes.root, {
        [classes.searchBarFocused]: isFocused,
      })}
    >
      <div className={classes.search}>
        <SearchIcon className={classes.searchIcon} />
        <InputBase
          className={classes.inputBase}
          placeholder="Search by username"
          inputRef={searchTextRef}
          onKeyPress={handleKeyPress}
        />
        <IconButton>
          <ClearIcon onClick={handleClear} />
        </IconButton>
      </div>
    </Paper>
  );
}
