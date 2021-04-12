import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { fetchItems, searchItems } from "../../store/actions/userActions";
import Item from "./Item";

class Items extends Component {
  state = {
    items: this.props.fetchedItems,
    moreItems: this.props.moreItems,
  };
  async componentDidMount() {
    await this.props.FetchItems();
  }
  componentWillUnmount() {
    return this.props.CleanUp();
  }
  componentDidUpdate(prePro) {
    if (
      JSON.stringify(this.props.fetchedItems) !==
      JSON.stringify(prePro.fetchedItems)
    ) {
      this.setState({ items: this.props.fetchedItems });
    }
  }
  fetchNextItems = async () => {
    const { items } = this.state;
    const { cords } = this.props;
    const id = items[items.length - 1]._id;
    cords
      ? await this.props.SearchItems(id, cords)
      : await this.props.FetchItems(id);
  };
  render() {
    const { history } = this.props;
    return (
      <Fragment>
        <Grid container justify="center" style={{ marginTop: "10px" }}>
          <Grid item container style={{ width: "95%" }} spacing={2}>
            {this.state.items.map((item) => {
              const { name, img, _id, address } = item;
              return (
                <Item
                  key={_id}
                  history={history}
                  name={name}
                  img={img}
                  id={_id}
                  address={address}
                />
              );
            })}
            {this.state.items.length === 0 && <h1>No items</h1>}
          </Grid>
        </Grid>
        {this.props.moreItems && (
          <Button
            onClick={this.fetchNextItems}
            variant="contained"
            color="primary"
          >
            Next
          </Button>
        )}
      </Fragment>
    );
  }
}

const mapState = (state) => {
  // console.log(state.user.items);
  // console.log(state.user.moreItems);
  return {
    fetchedItems: state.user.items,
    loading: state.user.loadingItems,
    cords: state.user.cords,
    moreItems: state.user.moreItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    FetchItems: (id) => dispatch(fetchItems(id)),
    SearchItems: (cords, id) => dispatch(searchItems(cords, id)),
    CleanUp: () => dispatch({ type: "CLEAN_FETCHED_ITEMS" }),
  };
};

export default compose(connect(mapState, mapDispatch)(withRouter(Items)));
