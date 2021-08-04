import {
  Avatar,
  CssBaseline,
  FormControlLabel,
  Container,
  makeStyles,
  Typography,
  Checkbox,
  Button,
  Grid,
} from "@material-ui/core";
import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { combineValidators, isRequired } from "revalidate";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../Form/TextInput";
import { signIn } from "../../../store/actions/authActions";

const validate = combineValidators({
  email: isRequired({ message: "Please Enter Your Email..." }),
  password: isRequired({ message: "Please Enter Your Password..." }),
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
const Signin = (props) => {
  const { openDrawerLogin, handleSubmit, signin_user } = props;
  const classes = useStyles();
  const submitVal = (val) => {
    signin_user(val);
    openDrawerLogin();
  };
  return (
    <Container maxWidth="xl" component="main">
      <CssBaseline />
      <Avatar className={classes.crossIcon} onClick={openDrawerLogin}>
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
                type="email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="Email Address"
                name="email"
                autoComplete="email"
              />

              <Field
                component={TextInput}
                type="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                placeholder="Password"
                name="password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch) => {
  return {
    signin_user: (cred) => dispatch(signIn(cred)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(reduxForm({ form: "SigninForm", validate })(withRouter(Signin)));
