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
    moreItems: false,
  };
  async componentDidMount() {
    const res = await this.props.FetchItems();
    if (res.length === 4) {
      this.setState({ moreItems: true });
    } else {
      this.setState({ moreItems: false });
    }
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
    const { FetchItems, cords } = this.props;
    const id = items[items.length - 1]._id;
    const res = cords
      ? await this.props.SearchItems(id, cords)
      : await this.props.FetchItems(id);
    if (res.length === 4) {
      this.setState({ items: this.props.fetchedItems, moreItems: true });
    } else {
      this.setState({ items: this.props.fetchedItems, moreItems: false });
    }
  };
  render() {
    const { fetchedItems, history } = this.props;
    return (
      <Fragment>
        <Grid container justify="center" style={{ marginTop: "10px" }}>
          <Grid item container style={{ width: "95%" }} spacing={2}>
            {this.state.items.map((item) => {
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
        {this.state.moreItems && (
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
  // console.log(state.user.cords);
  return {
    fetchedItems: state.user.items,
    loading: state.user.loadingItems,
    cords: state.user.cords,
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
