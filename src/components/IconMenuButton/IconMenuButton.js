import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
// icons
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AlertDialog from "../Dialog/AlertDialog";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "center",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "#f2f2f2",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.black,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  iconButton: {
    backgroundColor: "#fafafa",
  },
  icon: {
    color: "#1d1f23",
  },
}));

export default function CustomizedMenus({
  userId,
  userEmail,
  isActiveUser,
  handleReloadClick,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [title, setTitle] = React.useState("Title");
  const [severity, setSeverity] = React.useState("info");
  const [alertDescription, setAlertDescription] = React.useState(
    "Alert description"
  );
  const [agreeText, setAgreeText] = React.useState("Send");
  const [actionExecOnUser, setActionExecOnUser] = React.useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // // title, severity, alertDescription, agreeText
  // const handleResetPasswordClick = () => {
  //   handleClose();
  //   setOpenDialog(true);

  //   // set corresponding values to [title, severity, alertDescription, agreeText]
  //   setTitle("Reset password");
  //   setSeverity("info");
  //   setAlertDescription("Send a password reset email.");
  //   setAgreeText("Send");

  //   // call API
  // };

  const handleDisableUserClick = async () => {
    handleClose();
    setOpenDialog(true);

    // create dialog -> set corresponding values to [title, severity, alertDescription, agreeText]
    setTitle("Disable user");
    setSeverity("warning");
    setAlertDescription(
      "Users with disabled accounts are not able to sign in."
    );
    setAgreeText("Disable");

    setActionExecOnUser("disable");
  };

  const handleEnableUserClick = async () => {
    handleClose();
    setOpenDialog(true);

    // set corresponding values to [title, severity, alertDescription, agreeText]
    setTitle("Enable user");
    setSeverity("info");
    setAlertDescription(
      "Users with enabled accounts will be able to sign in again."
    );
    setAgreeText("Enable");

    setActionExecOnUser("enable");
  };

  const handleDeleteUserClick = () => {
    handleClose();
    setOpenDialog(true);

    // set corresponding values to [title, severity, alertDescription, agreeText]
    setTitle("Delete user");
    setSeverity("error");
    setAlertDescription(
      "After you delete an account, it's permanently deleted. Accounts can't be undeleted."
    );
    setAgreeText("Delete");

    setActionExecOnUser("delete");
  };

  return (
    <div>
      <IconButton
        aria-label="more-action"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        className={classes.iconButton}
        size="small"
      >
        <Tooltip title="View more actions">
          <MoreVertIcon className={classes.icon} />
        </Tooltip>
      </IconButton>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableAutoFocusItem={true}
      >
        {/* <StyledMenuItem onClick={handleResetPasswordClick}>
          <ListItemText primary="Reset password" />
        </StyledMenuItem> */}

        {isActiveUser ? (
          <StyledMenuItem onClick={handleDisableUserClick}>
            <ListItemText primary="Disable user" />
          </StyledMenuItem>
        ) : (
          <StyledMenuItem onClick={handleEnableUserClick}>
            <ListItemText primary="Enable user" />
          </StyledMenuItem>
        )}

        <StyledMenuItem onClick={handleDeleteUserClick}>
          <ListItemText primary="Delete user" />
        </StyledMenuItem>
      </StyledMenu>

      <AlertDialog
        open={openDialog}
        title={title}
        severity={severity}
        alertDescription={alertDescription}
        content={
          <>
            <Typography variant="subtitle2">User account</Typography>
            <Typography variant="h6">
              {userEmail || "example@gmail.com"}
            </Typography>
          </>
        }
        agreeText={agreeText}
        handleClose={() => setOpenDialog(false)}
        actionExecOnUser={actionExecOnUser}
        handleReloadClick={handleReloadClick}
        userId={userId}
      />
    </div>
  );
}
