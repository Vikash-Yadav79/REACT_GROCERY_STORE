import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cart from "./cart";

import Button from "react-bootstrap/Button";
let subTotal;
const CartList = (props) => {
  const items = JSON.parse(JSON.stringify(localStorage.getItem("CART_ITEMS")));
  const [CartItems, setCartItems] = useState(JSON.parse(items));
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    subTotal = 0;
    JSON.parse(items).forEach((element) => {
      subTotal = subTotal + element.price * element.quantity;
    });
    setTotalPrice(subTotal);
  }, []);

  const user = JSON.parse(
    JSON.stringify(localStorage.getItem("loggedUser") || "")
  );
  const handleOrder = () => {};

  return (
    <div className="row ms-1" style={{ minHeight: "100vh" }}>
      <div className="col-xs-12 col-sm-1 col-md-2 col-xl-3"></div>
      <div className="col-xs-12 col-sm-10 col-md-8 col-xl-6">
        <h2 className="mt-5">Cart</h2>
        <p className="item">
          {CartItems.length} {CartItems.length > 1 ? `Items` : `Item`}{" "}
        </p>
        {CartItems.length > 0 ? (
          CartItems.map((item) => (
            <Cart
              key={item.id}
              item={item}
              setCartItems={setCartItems}
              setTotalItem={props.setTotalItem}
              setTotalPrice={setTotalPrice}
            />
          ))
        ) : (
          <>
            <h4 className="ms-5">Hi {user.name.split(" ")[0]}!</h4>
            <h3 className="text-center"> Your cart is empty</h3>
            <p className="text-center">
              You can go to home page to view more products
            </p>
          </>
        )}

        <hr />
        <div className="row">
          <div className="col-2 col-sm-2">
            <b className="pull-right">Subtotal</b>
          </div>
          <div className="col-6 col-sm-7 "></div>
          <div className="col-4 col-sm-3">
            <p>
              <b className="fw-bold ms-4">$</b>
              <b className="fw-bold "> {totalPrice}</b>
            </p>
            {CartItems.length > 0 && (
              <span
                className="btn btn-primary btn-sm mt-2 mb-5 ms-1"
                onClick={() => navigate("/checkout")}
              >
                Place order
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-1 col-md-2 col-xl-3"></div>
    </div>
  );
};

export default CartList;
