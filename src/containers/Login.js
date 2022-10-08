import React, { useEffect, useState } from "react";
import classes from "./css/Login.module.css";
import users from "../utils/Users";
import { useNavigate } from "react-router-dom";

function Login() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  let userData = JSON.parse(
    JSON.stringify(localStorage.getItem("USER_DETAILS") || "")
  );

  const LoginHandler = () => {
    console.log("testing", userData);
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
