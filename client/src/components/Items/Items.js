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
  const [items, setItems] = useState(fetchedItems);
  const [moreItems, setMoreItems] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("uE");
        const more = await FetchItems();
        console.log(more);
        console.log(props);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    //attching lazyload
    window.addEventListener("scroll", lazyLoader);

    //clean up function
    return () => {
      window.removeEventListener("scroll", lazyLoader);
    };
  }, []);

  // console.log(fetchedItems);
  const fetchNextItems = async () => {
    // const id = fetchedItems[fetchedItems.length - 1]._id;
    console.log("fetchNextItems", fetchedItems);
    // try {
    //   const res = await FetchItems(id);
    //   if (res.length === 0) {
    //     setMoreItems(false);
    //   } else {
    //     const copyItems = [...items, ...res];
    //     setItems(copyItems);
    //     setMoreItems(true);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const lazyLoader = async () => {
    const scroolIsAtBottom =
      document.documentElement.scrollHeight - window.innerHeight - 100 <=
      window.scrollY;
    console.log(scroolIsAtBottom);
    console.log(fetchedItems);
    if (scroolIsAtBottom) {
      console.log("LAZY");
      fetchNextItems();
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
  // console.log(state);
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
