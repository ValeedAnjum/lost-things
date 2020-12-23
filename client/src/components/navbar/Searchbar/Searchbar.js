import React from "react";
import { Fragment } from "react";

const Searchbar = () => {
  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            outline: "none",
            border: "none",
            padding: "5px",
            height: "30px",
            width: "88%",
          }}
        />
        <button style={{ border: "none", width: "12%" }}>Find</button>
      </div>
    </Fragment>
  );
};

export default Searchbar;
