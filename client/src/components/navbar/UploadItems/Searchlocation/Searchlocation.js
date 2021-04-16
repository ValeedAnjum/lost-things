import React from "react";
import { Fragment } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import SearchResult from "../../Searchbar/SearchResult";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles(() => {
  return {
    root: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "0",
      },
    },
  };
});
const Searchlocation = ({ setCoordinates, setAddress, address }) => {
  const classes = useStyles();
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
        className={classes.root}
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <Fragment>
              <TextField
                {...getInputProps({
                  className: "location-search-input",
                })}
                className={classes.root}
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
