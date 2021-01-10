import React, { useState } from "react";
// material ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
// icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//
import Axios from "axios";
// react-router-dom
import { Redirect, useHistory } from "react-router-dom";
// from this project
import API from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  signUpMessage: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(-2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const auth = useAuth();
  const history = useHistory();

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      const { token, user, message } = await auth.register(
        emailValue,
        usernameValue,
        passwordValue
      );
      console.log(token, user, message);
      if (message) {
        setSignUpMessage(message);
      }
      history.push("/");
    } catch (error) {
      setSignUpMessage(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {/* <Typography
          variant="caption"
          className={classes.signUpMessage}
          color="error"
          gutterBottom
        >
          {signUpMessage}
        </Typography> */}
        {signUpMessage && <Alert severity="error">{signUpMessage}</Alert>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => handleChange(e, setUsernameValue)}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => handleChange(e, setEmailValue)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => handleChange(e, setPasswordValue)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSignUp}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
