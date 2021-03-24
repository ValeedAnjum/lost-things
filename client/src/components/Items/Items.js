import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { fetchItems } from "../../store/actions/userActions";
import Item from "./Item";

const pictures = [
  "https://images.pexels.com/photos/5425971/pexels-photo-5425971.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/5560026/pexels-photo-5560026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/876466/pexels-photo-876466.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/876466/pexels-photo-876466.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/876466/pexels-photo-876466.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/876466/pexels-photo-876466.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];
const Items = (props) => {
  const { history, FetchItems, fetchedItems, loading } = props;
  const [items, setItems] = useState([]);
  const [moreItems, setMoreItems] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await FetchItems();
        if (res.length === 0) {
          setMoreItems(false);
        } else {
          setItems(res);
          setMoreItems(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    //attching lazyload
    window.addEventListener("scroll", lazyLoader);

    //clean up function
    return () => {
      console.log("LAZY");
      window.removeEventListener("scroll", lazyLoader);
    };
  }, []);
  const fetchNextItems = async () => {
    const id = items[items.length - 1]._id;
    console.log(id);
    try {
      const res = await FetchItems(id);
      if (res.length === 0) {
        setMoreItems(false);
      } else {
        const copyItems = [...items, ...res];
        setItems(copyItems);
        setMoreItems(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const lazyLoader = async () => {
    console.log("haha");
    const scroolIsAtBottom =
      document.documentElement.scrollHeight - window.innerHeight - 1800 <=
      window.scrollY;
    if (scroolIsAtBottom && moreItems) {
      console.log("Do something here...");
    }
  };
  return (
    <Fragment>
      <Grid container justify="center" style={{ marginTop: "10px" }}>
        <Grid item container style={{ width: "95%" }} spacing={2}>
          {items.map((item) => {
            const { name, img, _id } = item;
            return (
              <Item
                key={_id}
                history={history}
                name={name}
                img={img}
                id={_id}
              />
            );
          })}
        </Grid>
      </Grid>
      <Button onClick={fetchNextItems} variant="contained" color="primary">
        Next
      </Button>
    </Fragment>
  );
};

const mapState = (state) => {
  // console.log(state.user.items);
  return {
    fetchedItems: state.user.items,
    loading: state.user.loadingItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    FetchItems: (id) => dispatch(fetchItems(id)),
  };
};

export default compose(connect(mapState, mapDispatch)(withRouter(Items)));
