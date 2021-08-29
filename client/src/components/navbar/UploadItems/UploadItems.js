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
    itemImage: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    datePicker: {
      "& .MuiFormControl-root": {
        width: "100%",
      },
    },
    extraTextFields: {
      marginBottom: "10px",
      width: "100%",
      "& .MuiOutlinedInput-root": {
        borderRadius: "0",
      },
    },
  };
});
const UploadItems = (props) => {
  const { setopenDrawerUpload, handleSubmit, item_upload } = props;
  const [details, setdetails] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [file, setfile] = useState(null);
  const [selectedDate, setselectedDate] = useState(new Date());
  const [address, setAddress] = useState("");
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
      const detailValue = document.getElementById(id).value.trim();
      if (detailValue !== "") {
        detailDescriptions.push(document.getElementById(id).value);
      }
    });
    val.details = [val.detail, ...detailDescriptions];
    const CopyVal = { ...val, date: selectedDate, coordinates, file, address };
    delete CopyVal.detail;

    // upload_image(CopyVal);
    item_upload(CopyVal);
    setopenDrawerUpload();
  };
  const addDetail = () => {
    const detailsCopy = [...details];
    details.length === 0
      ? detailsCopy.push(1)
      : detailsCopy.push(details[details.length - 1] + 1);
    setdetails(detailsCopy);
  };

  const fileChangeHandler = (event) => {
    // const demoImage = document.querySelector("img");
    let fileInput = false;
    // event.target.files[0] && upload_image(event.target.files[0]);
    // setfile(event.target.files[0]) &&
    // console.log(event.target.files[0]);
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
        (file) => {
          setfile(file);
          if (file) {
            //converting file to base64 uri
            const objectURL = URL.createObjectURL(file);
            const demoImage = document.getElementById("display-item-image");
            demoImage.src = objectURL;
          }
        },
        "file",
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
              <Searchlocation
                setCoordinates={setCoordinates}
                setAddress={setAddress}
                address={address}
              />
              {/* <Button
                variant="contained"
                color="primary"
                onClick={getCurrentPosition}
                style={{ borderRadius: 0 }}
              >
                Current Location
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
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
              <div style={{ textAlign: "center", margin: "5px 0" }}>
                {file && (
                  <img
                    id="display-item-image"
                    className={classes.itemImage}
                    alt="item"
                  />
                )}
              </div>
              {/* date  */}
              <Typography variant="h6">Date*</Typography>
              <div className={classes.datePicker}>
                <Datepicker
                  selectedDate={selectedDate}
                  handleDateChange={handleDateChange}
                />
              </div>
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
                    className={classes.extraTextFields}
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
