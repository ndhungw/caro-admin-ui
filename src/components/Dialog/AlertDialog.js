import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    marginTop: theme.spacing(2),
  },
  buttonSeveritySerious: {
    backgroundColor: "#d32f2f",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#b52828",
      color: "#fff",
    },
  },
  buttonAgree: {
    backgroundColor: "#1a73e8",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#155bb7",
      color: "#fff",
    },
  },
  buttonCancel: {
    backgroundColor: "#f5f5f5",
    color: "#8f8f8f",

    "&:hover": {
      backgroundColor: "#ebebeb",
      color: "#8f8f8f",
    },
  },
}));

export default function AlertDialog({
  open,
  title,
  severity,
  alertDescription,
  content,
  agreeText,
  handleClose,
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        <DialogContent>
          <Alert severity={severity}>{alertDescription}</Alert>
          <DialogContentText
            className={classes.dialogContent}
            id="alert-dialog-description"
          >
            {content}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} className={classes.buttonCancel}>
            <strong>Cancel</strong>
          </Button>
          <Button
            onClick={handleClose}
            className={clsx({
              [classes.buttonAgree]: severity === "info",
              [classes.buttonSeveritySerious]: severity !== "info",
            })}
            variant="contained"
            autoFocus
          >
            <strong>{agreeText || "Agree"}</strong>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
