import {
  Avatar,
  CssBaseline,
  FormControlLabel,
  Container,
  makeStyles,
  Typography,
  TextField,
  Checkbox,
  Button,
  Grid,
} from "@material-ui/core";
import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { combineValidators, isRequired } from "revalidate";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../Form/TextInput";

const validate = combineValidators({
  name: isRequired({ message: "Name is required" }),
  email: isRequired({ message: "Email is required" }),
  password: isRequired({ message: "Password is also required" }),
});

const useStyles = makeStyles((theme) => {
  return {
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    crossIcon: {
      position: "absolute",
      right: "15px",
      top: "10px",
      backgroundColor: theme.palette.secondary.main,
      cursor: "pointer",
    },
  };
});
const Register = (props) => {
  const { setopenDrawerRegister, handleSubmit } = props;
  const classes = useStyles();
  const register = (event) => {
    event.preventDefault();
  };
  const submitVal = (val) => {
    console.log(val);
  };
  return (
    <Container maxWidth="xl" component="main">
      <CssBaseline />
      <Avatar className={classes.crossIcon} onClick={setopenDrawerRegister}>
        X
      </Avatar>
      <Grid container justify="center">
        <Grid item xs={12} sm={4}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registration
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(submitVal)}
            >
              <Field
                component={TextInput}
                type="name"
                placeholder="Name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Registration
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapState = (state) => {
  console.log(state);
  return {};
};

export default connect(mapState)(
  reduxForm({ form: "RegisterForm", validate })(withRouter(Register))
);
