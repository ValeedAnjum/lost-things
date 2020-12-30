import React from "react";

const SearchResult = ({ sug, style, getSuggestionItemProps }) => {
  return (
    <li
      style={{ fontWeight: "600", padding: "5px" }}
      {...getSuggestionItemProps(sug, { style })}
    >
      <span style={{ fontWeight: "300" }}>{sug.description}</span>
    </li>
  );
};

export default SearchResult;
