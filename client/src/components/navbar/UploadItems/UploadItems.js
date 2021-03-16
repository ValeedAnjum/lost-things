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
import Resizer from "react-image-file-resizer";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { combineValidators, isRequired } from "revalidate";
import { reduxForm, Field } from "redux-form";

import TextInput from "../../Form/TextInput";
import { uploadItem } from "../../../store/actions/userActions";
import Searchlocation from "./Searchlocation/Searchlocation";
import Datepicker from "./Datepicker";

const validate = combineValidators({
  name: isRequired({ message: "Please Enter Item Description..." }),
  location: isRequired({ message: "Please Select Item Location..." }),
  date: isRequired({ message: "Please Enter Date..." }),
  detail: isRequired({
    message: "Please enter at least 1 hint about the product",
  }),
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
  const [details, setdetails] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 24, lng: 70 });
  const [file, setfile] = useState(null);
  const [selectedDate, setselectedDate] = useState(new Date());

  const classes = useStyles();
  const submitData = (val) => {
    if (!coordinates) {
      alert("Please Select A Location");
      return;
    }
    if (!file) {
      alert("Please Select A Picture");
      return;
    }
    const detailDescriptions = [];
    details.forEach((id) => {
      detailDescriptions.push(document.getElementById(id).value);
    });
    val.details = [val.detail, ...detailDescriptions];
    const CopyVal = { ...val, date: selectedDate, coordinates, file };
    delete CopyVal.detail;

    // console.log(CopyVal);
    item_upload(CopyVal);
  };
  const addDetail = () => {
    const detailsCopy = [...details];
    details.length === 0
      ? detailsCopy.push(1)
      : detailsCopy.push(details[details.length - 1] + 1);
    setdetails(detailsCopy);
  };
  const getCurrentPosition = () => {
    console.log("get");
  };
  const fileChangeHandler = (event) => {
    // var demoImage = document.querySelector('img');
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        500,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          setfile(uri);
          if (uri) {
            var demoImage = document.getElementById("display-profile-image");
            demoImage.src = uri;
          }
        },
        "base64",
        500,
        300
      );
    }
  };
  const selectImage = () => {
    document.getElementById("select-image").click();
  };
  const handleDateChange = (date) => {
    setselectedDate(date._d);
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

              {/* Serach Location and get coordinates  */}
              <Searchlocation setCoordinates={setCoordinates} />
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
                onClick={selectImage}
              >
                Upload Picture
              </Button>
              {/* displaying picture  */}
              <input
                type="file"
                onChange={fileChangeHandler}
                accept="image/*"
                id="select-image"
                style={{ display: "none" }}
              />
              <div>{file && <img id="display-profile-image" alt="item" />}</div>
              {/* date  */}
              <Typography variant="h6">Date*</Typography>
              <Datepicker
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
              {/* details  */}
              <Typography variant="h6">Details*</Typography>
              <Field
                component={TextInput}
                name="detail"
                placeholder="please enter a hint"
                type="text"
                style={{ width: "100%", marginBottom: "10px" }}
                variant="outlined"
                required
              />
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
