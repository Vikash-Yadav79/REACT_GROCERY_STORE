import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoupounModal } from "./Coupoun";

export const Checkout = () => {
  const [CART_ITEMS, SET_CART_ITEMS] = useState([]);
  const [ITEM_TOTAL_PRICE, SET_ITEM_TOTAL_PRICE] = useState(0);
  const [TOTAL_PRICE, SET_TOTAL_PRICE] = useState(0);
  const [SHOW, SET_SHOW] = useState(false);
  const [ADDRESS, SET_ADRESS] = useState("");
  const [coupoun, setCoupoun] = useState("0% Discount");
  const navigate = useNavigate();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("CART_ITEMS") || "");
    let totalPrice = 0;
    items.map((item) => (totalPrice += item.price * item.quantity));
    SET_ITEM_TOTAL_PRICE(totalPrice);
    SET_CART_ITEMS([...items]);
  }, []);

  useEffect(() => {
    const value = JSON.parse(JSON.stringify(localStorage.getItem("Coupoun")));
    setCoupoun(`${value}% Discount`);
    if (ITEM_TOTAL_PRICE) {
      SET_TOTAL_PRICE(
        ITEM_TOTAL_PRICE - ITEM_TOTAL_PRICE * (Number(value) / 100)
      );
    }
  }, [SHOW, ITEM_TOTAL_PRICE]);
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
              {CART_ITEMS.length &&
                CART_ITEMS.map((item, index) => {
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
                <td>{ITEM_TOTAL_PRICE}</td>
              </tr>
              <tr>
                <td colSpan={3}>Discount</td>
                <td>{coupoun}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <button className="btn btn-primary" onClick={() => SET_SHOW(!SHOW)}>
              Add Coupouns
            </button>
            <div>{coupoun}</div>
            {SHOW ? (
              <CoupounModal show={SHOW} onClose={() => SET_SHOW(!SHOW)} />
            ) : null}
          </div>
          <div className="d-flex justify-content-end fw-bold me-5">
            Total price: <span className="fw-light ms-2">{TOTAL_PRICE}</span>
          </div>
        </div>
      </div>
      <div className="col-xl-4 mb-3">
        <label className="form-label fw-bold">Address</label>
        <textarea
          className="form-control"
          rows="3"
          value={ADDRESS}
          onChange={(event) => SET_ADRESS(event.target.value)}
        />
      </div>
      <button
        className="btn btn-success"
        onClick={() => {
          navigate("/message");
          localStorage.setItem("CART_ITEMS", JSON.stringify([]));
          localStorage.setItem("Coupoun", 0);
        }}
        disabled={!ADDRESS}
      >
        Payment
      </button>
    </div>
  );
};
