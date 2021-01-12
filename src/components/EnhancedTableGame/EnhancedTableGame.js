import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  Switch,
  Chip,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// from this project
import EnhancedTableToolbar from "./EnhancedTableGameToolbar";
import EnhancedTableHead from "./EnhancedTableGameHead";
import CustomTablePaginationActions from "./TablePaginationActions";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  tableContainer: {
    maxHeight: "50vh",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  username: {
    width: "70px",
  },
  usernameCell: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function EnhancedTableGame({ games, handleReloadClick }) {
  const classes = useStyles();
  // order
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("created");
  // select by click
  const [selected, setSelected] = React.useState([]);
  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // optional
  const [dense, setDense] = React.useState(false);

  // handle sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // handle Click
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = games.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, username) => {
    const selectedIndex = selected.indexOf(username);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, username);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // optional
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (username) => selected.indexOf(username) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, games.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />

        <TableContainer className={classes.tableContainer}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="sticky enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={games.length}
            />
            <TableBody>
              {/* {stableSort(rows, getComparator(order, orderBy)) */}
              {stableSort(games, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.username);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.username)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.username}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) =>
                            handleClick(
                              event,
                              row.username /* row.createdAt ? */
                            )
                          } // only by click to checkbox will select row
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>

                      {/* RoomID */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <div className={classes.usernameCell}>
                          <Tooltip title={row.username}>
                            <Typography className={classes.username} noWrap>
                              {/* {row.username} */}
                              {row.roomId}
                            </Typography>
                          </Tooltip>
                        </div>
                      </TableCell>

                      {/* Player1 */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <div className={classes.userDisplayName}>
                          <Tooltip title={`${row.firstName} ${row.lastName}`}>
                            <Typography
                              className={classes.userDisplayName}
                              noWrap
                            >
                              {/* {`${row.firstName} ${row.lastName}`} */}
                              {row.player1 || "Player 1"}
                              {row.winner === 1 ? (
                                <Chip
                                  label="WIN"
                                  color="primary"
                                  size="small"
                                />
                              ) : (
                                <Chip
                                  label="LOSE"
                                  color="secondary"
                                  size="small"
                                />
                              )}
                            </Typography>
                          </Tooltip>
                        </div>
                      </TableCell>

                      {/* Player2 */}
                      <TableCell align="left">
                        {row.player2 || "Player 2"}
                        {row.winner === 2 ? (
                          <Chip label="WIN" color="primary" size="small" />
                        ) : (
                          <Chip label="LOSE" color="secondary" size="small" />
                        )}
                      </TableCell>

                      {/* createdAt */}
                      <TableCell align="left">
                        {new Date(row.createdAt).toLocaleString()}
                      </TableCell>

                      {/* chat history */}
                      <TableCell align="left">
                        {row.chatHistory || "chat history here"}
                      </TableCell>
                      {/* <TableCell align="left">
                        <CustomizedMenus
                          userId={row._id}
                          userEmail={row.email}
                          isActiveUser={row.active}
                          handleReloadClick={handleReloadClick}
                        />
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100, 250, { value: -1, label: "All" }]}
          count={games.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          ActionsComponent={CustomTablePaginationActions}
        />

        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Paper>
    </div>
  );
}
