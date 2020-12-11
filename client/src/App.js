import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Details from "./components/Details/Details";
import Home from "./views/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/details/:id" component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
