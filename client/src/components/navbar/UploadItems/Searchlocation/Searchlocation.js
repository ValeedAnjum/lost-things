import React from "react";
import { Fragment } from "react";
import { Field } from "redux-form";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import TextInput from "../../../Form/TextInput";

const Searchlocation = () => {
  const handleChange = (address) => {
    console.log(address);
  };
  const handleSelect = (address) => {
    console.log(address);
  };
  return (
    <Fragment>
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        <Field
          component={TextInput}
          type="name"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="location"
          placeholder="search location or click on current location"
          name="location"
          autoComplete="location"
        />
      </PlacesAutocomplete>
    </Fragment>
  );
};

export default Searchlocation;
