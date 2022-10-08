import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Navbar from "./containers/NavBar";
import CartList from "./containers/cart/cartList";
import { Checkout } from "./containers/Checkout";
import { OrderedMessage } from "./containers/OrderedMessage";

function Routers(props) {
  const [totalItem, setTotalItem] = useState([]);
  const itemsFromCart = JSON.parse(
    JSON.stringify(localStorage.getItem("CART_ITEMS") || "")
  );
  useEffect(() => {
    if (itemsFromCart && itemsFromCart.length) {
      setTotalItem(itemsFromCart);
    }
  }, []);
  console.log(totalItem.length);
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
      </Routes>
    </>
  );
}

export default Routers;
