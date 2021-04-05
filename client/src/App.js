import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar/Navbar";
import Details from "./components/Details/Details";
import Home from "./views/Home/Home";
import ModelManager from "./components/ModelManager/ModelManager";
import { loadUser } from "./store/actions/authActions";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <ModelManager />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/details/:id" component={Details} />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
