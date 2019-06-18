import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Support from "./components/Support";
import Dashboard from "./components/Dashboard";
import LoginTwoStepfrom from "./components/LoginTwoStep";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />

          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/logintwostep" component={LoginTwoStepfrom} exact />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/support" component={Support} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
