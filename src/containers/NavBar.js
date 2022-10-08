import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light ">
      <div className="container-fluid">
        <a className="navbar-brand" onClick={() => navigate("/home")}>
          Grocery Store
        </a>

        <div
          className="collapse navbar-collapse ml-2"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form className="d-flex" role="search">
            <div>
              {location.pathname !== "/" ? (
                <i
                  className="fa fa-shopping-cart"
                  style={{ fontSize: "48px", color: "red" }}
                  onClick={goToCart}
                />
              ) : null}
              <span>
                {props.totalItem.length > 0 && props.totalItem.length}
              </span>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
