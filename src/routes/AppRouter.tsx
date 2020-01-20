import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "components";
import { Cart, Home, Products } from "pages";
import { ROUTE_ROOT, ROUTE_PRODUCTS, ROUTE_CART } from "./const";

export const AppRouter = () => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path={ROUTE_ROOT} component={Home} />
        <Route exact path={ROUTE_PRODUCTS} component={Products} />
        <Route path={ROUTE_CART} component={Cart} />
      </Switch>
    </div>
  </BrowserRouter>
);
