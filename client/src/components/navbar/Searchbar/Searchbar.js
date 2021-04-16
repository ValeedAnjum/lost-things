import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Grid from "@material-ui/core/Grid";
import SearchResult from "./SearchResult";
import { searchItems } from "../../../store/actions/userActions";
import { compose } from "redux";

const Searchbar = (props) => {
  const { SearchItems, location, history } = props;
  const [address, setAddress] = useState("");
  const handleSelect = async (value) => {
    if (location.pathname !== "/") {
      history.push("/");
    }
    const results = await geocodeByAddress(value);
    const latLan = await getLatLng(results[0]);
    setAddress(value);
    SearchItems(null, latLan);
  };
  useEffect(() => {
    document.getElementsByClassName("location-search-input")[0].value = "";
  }, [location.pathname]);
  return (
    <Fragment>
      <Grid container direction="column">
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => {
            return (
              <Fragment>
                <Grid item xs={12}>
                  <div style={{ display: "flex" }}>
                    <input
                      {...getInputProps({
                        placeholder: "Search...",
                        className: "location-search-input",
                      })}
                      type="text"
                      style={{
                        outline: "none",
                        border: "none",
                        padding: "5px",
                        height: "30px",
                        width: "88%",
                      }}
                    />
                    <button style={{ border: "none", width: "12%" }}>
                      Find
                    </button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      position: "absolute",
                      top: "105%",
                      left: "0",
                      width: "100%",
                    }}
                  >
                    {
                      <Fragment>
                        {loading ? <h3>Loading...</h3> : null}
                        <ul
                          style={{
                            listStyleType: "none",
                            margin: "0",
                            paddingLeft: "0",
                            backgroundColor: "white",
                          }}
                        >
                          {suggestions.map((sug) => {
                            const style = {
                              backgroundColor: sug.active
                                ? "rgb(164 178 183)"
                                : "#fff",
                            };
                            return (
                              <SearchResult
                                sug={sug}
                                getSuggestionItemProps={getSuggestionItemProps}
                                key={sug.placeId}
                                style={style}
                              />
                            );
                          })}
                        </ul>
                      </Fragment>
                    }
                  </div>
                </Grid>
              </Fragment>
            );
          }}
        </PlacesAutocomplete>
      </Grid>
    </Fragment>
  );
};

const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch) => {
  return {
    SearchItems: (id, cords) => dispatch(searchItems(id, cords)),
  };
};

export default compose(connect(mapState, mapDispatch), withRouter)(Searchbar);
