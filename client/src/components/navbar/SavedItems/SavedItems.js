import {
  Avatar,
  CssBaseline,
  Container,
  makeStyles,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleItem from "./SingleItem";

const useStyles = makeStyles((theme) => {
  return {
    crossIcon: {
      position: "absolute",
      right: "15px",
      top: "10px",
      backgroundColor: theme.palette.secondary.main,
      cursor: "pointer",
    },
    itemContainer: {
      border: "1px solid #46373754",
      margin: "5px",
      borderRadius: "3px",
      "&:hover": {
        border: "1px solid #00000069",
      },
    },
  };
});
const SavedItems = (props) => {
  const { setsavedItem } = props;
  const [items, setitems] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    getItems();
  }, []);
  const getItems = async () => {
    const items = await axios.get("/item/saveditems");
    console.log(items.data);
    setitems(items.data);
  };
  const deleteItem = async (id) => {
    try {
      const deleteItemRes = await axios.post(`/item/deleteitem/${id}`);
      getItems();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container maxWidth="xl" component="main">
      <CssBaseline />
      <Avatar className={classes.crossIcon} onClick={setsavedItem}>
        X
      </Avatar>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <h1>Saved Items</h1>
        </Grid>
      </Grid>
      <Grid container>
        {items &&
          items.length > 0 &&
          items.map((item) => {
            return (
              <Grid container className={classes.itemContainer}>
                <SingleItem
                  deleteItem={deleteItem}
                  key={item._id}
                  item={item}
                />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default SavedItems;
