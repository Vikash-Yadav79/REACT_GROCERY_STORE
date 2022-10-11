import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Navbar from "./containers/NavBar";
import CartList from "./containers/cart/cartList";
import { Checkout } from "./containers/Checkout";
import { OrderedMessage } from "./containers/OrderedMessage";
import { My_Orders } from "./containers/my_orders";

function Routers(props) {
  const [totalItem, setTotalItem] = useState(0);
  const itemsFromCart = JSON.parse(
    JSON.stringify(localStorage.getItem("cartItems"))
  );
  useEffect(() => {
    if (itemsFromCart) {
      setTotalItem(itemsFromCart.length);
    }
  }, []);
  return (
    <>
      <Navbar totalItem={totalItem} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home setTotalItem={setTotalItem} />} />
        <Route
          path="/cart"
          element={<CartList setTotalItem={setTotalItem} />}
        />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/message" element={<OrderedMessage />} />
        <Route path="/my-orders" element={<My_Orders />} />
      </Routes>
    </>
  );
}

export default Routers;
