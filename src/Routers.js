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
  const [totalItem, setTotalItem] = useState(false);
  const setLength = () => {
    setTotalItem(true);
  }
  return (
    <>
      <Navbar totalItem={totalItem} setTotalItem={() => setTotalItem(false)} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home setTotalItem={() => setLength()} />} />
        <Route
          path="/cart"
          element={<CartList setTotalItem={() => setLength()} />}
        />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/message" element={<OrderedMessage />} />
        <Route path="/my-orders" element={<My_Orders />} />
      </Routes>
    </>
  );
}

export default Routers;
