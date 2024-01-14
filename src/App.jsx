import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./App.css";
import spaceLight from "./assets/giphy.gif";
import { useIsLoggedInContext } from "./Context/IsLoggedInContext";
import { useEffect, useState } from "react";

function App() {

  return (
    <>
      <div className="navabar_bg">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
