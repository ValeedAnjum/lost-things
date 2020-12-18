import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar/Navbar";
import Details from "./components/Details/Details";
import Home from "./views/Home/Home";
import ModelManager from "./components/ModelManager/ModelManager";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <ModelManager />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/details/:id" component={Details} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
