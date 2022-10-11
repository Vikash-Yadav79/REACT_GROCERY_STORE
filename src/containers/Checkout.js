import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoupounModal } from "./Coupoun";

export const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [itemTotalPrice, setItemTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("");
  const [coupoun, setCoupoun] = useState("0% Discount");
  const navigate = useNavigate();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "");
    let totalPrice = 0;
    items.map((item) => (totalPrice += item.price * item.quantity));
    setItemTotalPrice(totalPrice);
    setCartItems([...items]);
  }, []);

  useEffect(() => {
    const value = JSON.parse(JSON.stringify(localStorage.getItem("Coupoun")));
    setCoupoun(`${value}% Discount`);
    if (itemTotalPrice) {
      setTotalPrice(itemTotalPrice - itemTotalPrice * (Number(value) / 100));
    }
  }, [show, itemTotalPrice]);

  const onOrder = () => {
    const orderDetails = JSON.parse(
      JSON.stringify(localStorage.getItem("myOrders"))
    );
    const cartItems = JSON.parse(
      JSON.stringify(localStorage.getItem("cartItems"))
    );
    const userDetails = JSON.parse(
      JSON.stringify(localStorage.getItem("loggedUser"))
    );
    const userId = JSON.parse(userDetails).id;
    const myOrders = JSON.parse(orderDetails);
    const _cartItems = JSON.parse(cartItems);
    const items = [..._cartItems];
    const setOrderDetails = { ...myOrders, [`${userId}`]: [...items] };
    localStorage.setItem("myOrders", JSON.stringify(setOrderDetails));
    navigate("/message");
    localStorage.setItem("cartItems", JSON.stringify([]));
    localStorage.setItem("Coupoun", 0);
  };
  return (
    <div className="ms-5 mt-5">
      <div className="col-xl-5 card">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Item Name</th>
                <th>Item Quantity</th>
                <th>Item Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length &&
                cartItems.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                })}
              <tr>
                <td colSpan={3}>Total Item Price</td>
                <td>{itemTotalPrice}</td>
              </tr>
              <tr>
                <td colSpan={3}>Discount</td>
                <td>{coupoun}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <button className="btn btn-primary" onClick={() => setShow(!show)}>
              Add Coupouns
            </button>
            <div>{coupoun}</div>
            {show ? (
              <CoupounModal show={show} onClose={() => setShow(!show)} />
            ) : null}
          </div>
          <div className="d-flex justify-content-end fw-bold me-5">
            Total price: <span className="fw-light ms-2">{totalPrice}</span>
          </div>
        </div>
      </div>
      <div className="col-xl-4 mb-3">
        <label className="form-label fw-bold">Address</label>
        <textarea
          className="form-control"
          rows="3"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>
      <button
        className="btn btn-success"
        onClick={() => {
          onOrder();
        }}
        disabled={!address}
      >
        Payment
      </button>
    </div>
  );
};
