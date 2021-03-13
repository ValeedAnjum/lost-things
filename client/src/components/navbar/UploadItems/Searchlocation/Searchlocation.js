import React, { useState } from "react";
import { Fragment } from "react";
import { Field } from "redux-form";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import TextInput from "../../../Form/TextInput";
import SearchResult from "../../Searchbar/SearchResult";
import { TextField } from "@material-ui/core";

const Searchlocation = ({ setCoordinates }) => {
  const [address, setAddress] = useState("");
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLan = await getLatLng(results[0]);
    console.log(latLan);
    setAddress(value);
    setCoordinates(latLan);
  };

  return (
    <Fragment>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <Fragment>
              <TextField
                {...getInputProps({
                  placeholder: "Search...",
                  className: "location-search-input",
                })}
                type="name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="location"
                placeholder="search location or click on current location"
                name="location"
                autoComplete="off"
              />
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
                    console.log(suggestions);
                    const style = {
                      backgroundColor: sug.active ? "rgb(164 178 183)" : "#fff",
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
            </Fragment>
          );
        }}
      </PlacesAutocomplete>
    </Fragment>
  );
};

export default Searchlocation;
