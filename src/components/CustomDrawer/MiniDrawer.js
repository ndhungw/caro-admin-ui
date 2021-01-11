import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
// assets
import logo from "../../assets/img/logo.png";
import { useAuth } from "../../contexts/AuthContext";
import { Link as RRDLink } from "react-router-dom";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "inherit",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      //   width: theme.spacing(9) + 1,
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // custom
  accountIcon: {
    color: "black",
  },
  appBarButton: {
    margin: theme.spacing(1),
  },
  logo: {
    maxWidth: 40,
  },
  title: {
    marginLeft: theme.spacing(1),
  },
  logoTitle: {
    display: "flex",
    alignItems: "center",

    margin: theme.spacing(1.5, 1),
  },
  rightSide: {
    justifySelf: "flex-end",
    backgroundColor: "green",
  },
  RRDLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function MiniDrawer({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [auth, setAuth] = React.useState(true);
  const [openSideBar, setOpenSideBar] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const { logOut } = useAuth();

  const handleDrawerOpen = () => {
    setOpenSideBar(true);
  };

  const handleDrawerClose = () => {
    setOpenSideBar(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logOut();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openSideBar,
        })}
      >
        <Toolbar className={classes.toolbar}>
          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle className={classes.accountIcon} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                getContentAnchorEl={
                  null
                } /* add this (getContentAnchorEl={null}) to get the vertical properties work */
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openMenu}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button variant="contained" className={classes.appBarButton}>
                Log in
              </Button>
              <Button variant="contained" className={classes.appBarButton}>
                Sign up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {auth && (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: openSideBar,
            [classes.drawerClose]: !openSideBar,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: openSideBar,
              [classes.drawerClose]: !openSideBar,
            }),
          }}
        >
          <RRDLink to="/" className={classes.RRDLink}>
            <div className={classes.logoTitle}>
              <img src={logo} alt="logo" className={classes.logo} />
              <Typography variant="h6" noWrap className={classes.title}>
                <strong>ADMIN PANEL</strong>
              </Typography>
            </div>
          </RRDLink>
          <Divider />
          <List>
            {/* {navigationList.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <SportsEsportsIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
            <RRDLink to="/users" className={classes.RRDLink}>
              <ListItem button key={"users-page"}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Users"}></ListItemText>
              </ListItem>
            </RRDLink>
            <RRDLink to="/games" className={classes.RRDLink}>
              <ListItem button key={"games-page"}>
                <ListItemIcon>
                  <SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText primary={"Games"}></ListItemText>
              </ListItem>
            </RRDLink>
          </List>
          <Divider />

          <div className={classes.toolbar}>
            {openSideBar ? (
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx({
                  [classes.hide]: openSideBar,
                })}
              >
                <ChevronRightIcon />
              </IconButton>
            )}
          </div>
        </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
