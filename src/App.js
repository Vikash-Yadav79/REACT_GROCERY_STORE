import { useEffect, useState } from "react";
import "./App.css";
import Routers from "./Routers";
import usersDetails from "./utils/Users";

function App() {
  useEffect(() => {
    localStorage.setItem("USER_DETAILS", JSON.stringify(usersDetails));
    // const cartItems = JSON.parse(localStorage.getItem('ADD_TO_CART'));
    // localStorage.setItem("ADD_TO_CART", JSON.stringify(cartItems && cartItems.length ? cartItems : []));
  }, []);

  return (
    <>
      <Routers />
    </>
  );
}

export default App;
