import {
  Avatar,
  CssBaseline,
  Container,
  makeStyles,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { combineValidators, isRequired } from "revalidate";
import { reduxForm, Field } from "redux-form";
import Geocode from "react-geocode";

import TextInput from "../../Form/TextInput";
import { uploadItem } from "../../../store/actions/userActions";
import { GOOGLE_MAP_API_KEY } from "../../../config/config";

// Setting goole map api key
Geocode.setApiKey(GOOGLE_MAP_API_KEY);

const validate = combineValidators({
  name: isRequired({ message: "Please Enter Item Description..." }),
  location: isRequired({ message: "Please Select Item Location..." }),
  date: isRequired({ message: "Please Enter Date..." }),
});

const useStyles = makeStyles((theme) => {
  return {
    root: {
      borderRadius: 0,
    },
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
  const [details, setdetails] = useState([1]);
  const [coords, setcoords] = useState({});
  const classes = useStyles();
  const submitData = (val) => {
    const detailDescriptions = [];
    details.forEach((id) => {
      detailDescriptions.push(document.getElementById(id).value);
    });
    val.details = detailDescriptions;
    console.log(val);
    // item_upload(val);
  };
  const addDetail = () => {
    const detailsCopy = [...details];
    detailsCopy.push(details[details.length - 1] + 1);
    setdetails(detailsCopy);
  };
  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords.latitude);
      console.log(pos.coords.longitude);
      setcoords({ lati: pos.coords.latitude, longi: pos.coords.longitude });
      // reverse geo coding
      Geocode.fromLatLng(pos.coords.latitude, pos.coords.longitude).then(
        (response) => {
          const address = response.results[0].formatted_address;
          console.log(address);
        },
        (error) => {
          console.error(error);
        }
      );
    });
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
                placeholder="Item description"
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
                placeholder="search location or click on current location"
                name="location"
                autoComplete="location"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={getCurrentPosition}
                style={{ borderRadius: 0 }}
              >
                Current Location
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ borderRadius: 0 }}
              >
                Upload Picture
              </Button>
              {/* details  */}
              <Typography variant="h6">Details*</Typography>
              {details.map((key) => {
                return (
                  <TextField
                    key={key}
                    id={key.toString()}
                    type="text"
                    style={{ width: "100%", marginBottom: "10px" }}
                    variant="outlined"
                    required
                  />
                );
              })}

              <IconButton onClick={addDetail}>
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
  // console.log(state);
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
