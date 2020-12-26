import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
const App1 = () => {
  const [address, setAddress] = useState("");
  const handleSelect = async (value) => {};
  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      App 1
    </PlacesAutocomplete>
  );
};

export default App1;
