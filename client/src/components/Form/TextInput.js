import React from "react";
import TextField from "@material-ui/core/TextField";

const Textinput = (props) => {
  const {
    input,
    type,
    placeholder,
    meta: { touched, error },
  } = props;
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
        required
      />
    </React.Fragment>
  );
};

export default Textinput;
