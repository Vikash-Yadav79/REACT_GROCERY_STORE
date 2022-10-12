import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import './myOrders.css';

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartLength, setCartLength] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const _items = JSON.parse(JSON.stringify(localStorage.getItem('cartItems')));
  const user = JSON.parse(JSON.stringify(localStorage.getItem("loggedUser"))) || {};

  useEffect(() => {
    if (location.pathname !== "/") {
      if (Object.keys(user).length) {
        setUserDetails({ ...JSON.parse(user) });
      }
      const userId = JSON.parse(user).id;
      setCartLength(JSON.parse(_items)[`${userId}`].length);
      props.setTotalItem();
    }else if (props.totalItem) {
      if (Object.keys(user).length) {
        setUserDetails({ ...JSON.parse(user) });
      }
      const userId = JSON.parse(user).id;
      setCartLength(JSON.parse(_items)[`${userId}`].length);
      props.setTotalItem();
    }
  }, [location, props.totalItem]);
  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light ">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold cursor-pointer" onClick={() => navigate("/home")}>
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
                    className="fa fa-shopping-cart cursor-pointer"
                    style={{ fontSize: "37px", color: "black" }}
                    onClick={goToCart}
                  />
                  <span className="total_item">
                    {cartLength}
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
