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
  IconButton,
} from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { combineValidators, isRequired } from "revalidate";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../Form/TextInput";
import { uploadItem } from "../../../store/actions/userActions";

const validate = combineValidators({
  name: isRequired({ message: "Please Enter Item Description..." }),
  location: isRequired({ message: "Please Select Item Location..." }),
  date: isRequired({ message: "Please Enter Date..." }),
  detail: isRequired({ message: "Please Enter at least 1 hint..." }),
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
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      borderRadius: 0,
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
const UploadItems = (props) => {
  const { setopenDrawerUpload, handleSubmit, item_upload } = props;
  const classes = useStyles();
  const submitData = (val) => {
    item_upload(val);
  };
  return (
    <Container maxWidth="xl" component="main">
      <CssBaseline />
      <Avatar className={classes.crossIcon} onClick={setopenDrawerUpload}>
        X
      </Avatar>
      <Grid container justify="center">
        <Grid item xs={12} sm={12}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Upload Items
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(submitData)}
            >
              <Field
                component={TextInput}
                type="name"
                placeholder="Item Description"
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

              <Field
                component={TextInput}
                type="name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="location"
                placeholder="Item Location"
                name="location"
                autoComplete="location"
              />
              <Button
                variant="contained"
                color="primary"
                style={{ display: "block", borderRadius: 0 }}
              >
                Current Location
              </Button>
              {/* details  */}
              <Typography variant="h6">Details*</Typography>
              <Field
                component={TextInput}
                type="name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="detail"
                placeholder="Item Details"
                name="detail"
                autoComplete="detail"
              />
              <IconButton>
                <AddIcon />
              </IconButton>
              {/* details  */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Upload Item
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

const mapDispatch = (dispatch) => {
  return {
    item_upload: (data) => dispatch(uploadItem(data)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(reduxForm({ form: "UploadItemForm", validate })(withRouter(UploadItems)));
