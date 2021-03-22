import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
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
      await FetchItems();
      setItems(fetchedItems);
    }
    fetchData();
  }, []);
  console.log(fetchedItems);
  return (
    <Fragment>
      <Grid container justify="center" style={{ marginTop: "10px" }}>
        <Grid item container style={{ width: "95%" }} spacing={2}>
          {fetchedItems.map((item) => {
            const { name, img, _id } = item;
            return <Item history={history} name={name} img={img} id={_id} />;
          })}
        </Grid>
      </Grid>
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
    FetchItems: () => dispatch(fetchItems()),
  };
};

export default compose(connect(mapState, mapDispatch)(withRouter(Items)));
