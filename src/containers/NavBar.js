import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect, useState } from "react";

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (location.pathname !== "/") {
      const user =
        JSON.parse(JSON.stringify(localStorage.getItem("loggedUser"))) || {};
      if (Object.keys(user).length) {
        setUserDetails({ ...JSON.parse(user) });
      }
    }
  }, [location]);
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
            {location.pathname !== "/" ? (
              <div className="nav_right_container">
                <DropdownButton
                  id="dropdown-item-buttons"
                  title={
                    <span>
                      <i
                        class="fas fa-user-alt"
                        style={{ fontSize: "16px" }}
                      ></i>
                      &nbsp; Hello,
                      {userDetails && userDetails.name
                        ? userDetails.name
                        : "NA"}
                    </span>
                  }
                >
                  <Dropdown.Item onClick={() => navigate("/my-orders")}>
                    My orders
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/")}>
                    Logout
                  </Dropdown.Item>
                </DropdownButton>
                <div>
                  <i
                    className="fa fa-shopping-cart"
                    style={{ fontSize: "37px", color: "black" }}
                    onClick={goToCart}
                  />
                  <span className="total_item">
                    {props.totalItem > 0 && props.totalItem}
                  </span>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
