import React, { useState } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Grid from "@material-ui/core/Grid";
import SearchResult from "./SearchResult";
import { fetchItems } from "../../../store/actions/userActions";

const Searchbar = ({ FetchItems }) => {
  const [address, setAddress] = useState("");
  // const [coordinates, setCoordinates] = useState({ Lat: 0, Lng: 0 });
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLan = await getLatLng(results[0]);
    console.log(latLan);
    setAddress(value);
    FetchItems(null, latLan);
  };
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
  console.log(state.user.items);
  return {};
};

const mapDispatch = (dispatch) => {
  return {
    FetchItems: (id, cord) => dispatch(fetchItems(id, cord)),
  };
};

export default connect(mapState, mapDispatch)(Searchbar);
