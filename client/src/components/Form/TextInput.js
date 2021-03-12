import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      borderRadius: 0,
    },
  };
});
const Textinput = (props) => {
  const {
    input,
    type,
    placeholder,
    autoComplete,
    required,
    meta: { touched, error },
  } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* <input
        {...input}
        placeholder={touched && error ? error : placeholder}
        type={type}
        autoComplete="off"
        required={placeholder}
        className={touched && error ? "ErrorInput" : null}
      /> */}
      <TextField
        {...input}
        type={type}
        error={touched && error ? true : false}
        style={{ width: "100%", marginBottom: "10px" }}
        label={touched && error ? error : placeholder}
        variant="outlined"
        required={required}
        InputProps={{ classes }}
        autoComplete={autoComplete}
      />
    </React.Fragment>
  );
};

export default Textinput;
