import { useEffect, useState } from "react";
import "./App.css";
import Routers from "./Routers";
import usersDetails from "./utils/Users";

function App() {
  useEffect(() => {
    localStorage.setItem("USER_DETAILS", JSON.stringify(usersDetails));
  }, []);

  return (
    <>
      <Routers />
    </>
  );
}

export default App;
