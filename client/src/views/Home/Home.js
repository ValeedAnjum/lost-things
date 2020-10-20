import React, { Fragment } from "react";
import Items from "../../components/Items/Items";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <Items />
    </Fragment>
  );
};

export default Home;
