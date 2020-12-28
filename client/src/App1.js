import React, { useState } from "react";
import { Fragment } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
const App1 = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ Lat: 0, Lng: 0 });
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLan = await getLatLng(results[0]);
    console.log(latLan);
    setAddress(value);
    setCoordinates(latLan);
  };
  // console.log(coordinates.lat);
  return (
    <Fragment>
      <p>Latitude:{coordinates.lat}</p>
      <p>Longitude:{coordinates.lng}</p>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          console.log(suggestions);
          return (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div>
                {loading ? <div>...loading</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  };
                  return (
                    <h3 {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </h3>
                  );
                })}
              </div>
            </div>
          );
        }}
      </PlacesAutocomplete>
    </Fragment>
  );
};

export default App1;
