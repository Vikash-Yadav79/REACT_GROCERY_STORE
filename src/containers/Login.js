import React, { useState } from "react";
import classes from "./css/Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  let userData = JSON.parse(
    JSON.stringify(localStorage.getItem("USER_DETAILS") || "")
  );

  const LoginHandler = () => {
    userData = JSON.parse(userData);
    const { email, password } = details;
    const userDetails =
      userData &&
      userData.length &&
      userData.find((user) => user.email === email);
    if (userDetails) {
      if (userDetails.password !== password) {
        alert("Wrong Password");
        return;
      } else {
        localStorage.setItem("loggedUser", JSON.stringify(userDetails));
        const myOrders = JSON.parse(
          JSON.stringify(localStorage.getItem("myOrders"))
        );
        if (myOrders) {
          const details = JSON.parse(myOrders);
          if (!Object.keys(details).includes(userDetails.id)) {
            localStorage.setItem(
              "myOrders",
              JSON.stringify({ ...details, [`${userDetails.id}`]: [] })
            );
          }
        } else {
          localStorage.setItem(
            "myOrders",
            JSON.stringify({ [`${userDetails.id}`]: [] })
          );
        }
        const cartItems = JSON.parse(
          JSON.stringify(localStorage.getItem("cartItems"))
        );
        if (cartItems) {
          const details = JSON.parse(cartItems);
          if (!Object.keys(details).includes(userDetails.id)) {
            localStorage.setItem(
              "cartItems",
              JSON.stringify({ ...details, [`${userDetails.id}`]: [] })
            );
          }
        } else {
          localStorage.setItem(
            "cartItems",
            JSON.stringify({ [`${userDetails.id}`]: [] })
          );
        }
        navigate("/home");
      }
    } else {
      alert("User doesn't exist");
      return;
    }
  };

  return (
    <div className={classes.form_controller}>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={(e) =>
            setDetails((prevState) => {
              return { ...prevState, email: e.target.value };
            })
          }
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={(e) =>
            setDetails((prevState) => {
              return { ...prevState, password: e.target.value };
            })
          }
        />
      </div>
      <button onClick={LoginHandler} className="btn btn-primary">
        Log In
      </button>
    </div>
  );
}

export default Login;
