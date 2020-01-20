import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartSelector } from "selectors";
import { ROUTE_ROOT, ROUTE_CART } from "routes";

export const Navbar = () => {
  const { cartItemsNum } = useSelector(cartSelector());
  return (
    <>
      <nav className="d-flex align-items-center fixed-top">
        <div className="container nav-container d-flex align-items-center justify-content-between">
          <Link to={ROUTE_ROOT} className="brand-logo navbar-brand nav-link">
            Home
          </Link>
          <ul className="nav-menu-list-wrapper d-flex align-items-center">
            <li className="left-menu-list">
              <Link className="nav-link" to={ROUTE_CART} id="cart">
                <i className="fa fa-shopping-cart"></i> 장바구니{" "}
                <span className="badge">{cartItemsNum}</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
