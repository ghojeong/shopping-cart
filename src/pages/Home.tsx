import React from "react";
import { Redirect } from "react-router-dom";
import { ROUTE_PRODUCTS } from "routes";

export const Home = () => <Redirect to={ROUTE_PRODUCTS} />;
