import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "components";
import { Cart, Home, Products } from "pages";

export const App = () => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </div>
  </BrowserRouter>
);
