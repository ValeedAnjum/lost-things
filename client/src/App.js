import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./views/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/h" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
