import React from "react";
import "./NotFound.css"; // Import the styles
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "70.8vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="not-found-container">
        <h1>404 - Not Found</h1>
        <p>
          Oops! The page you are looking for might be under construction or does
          not exist.
        </p>
        <Link to="/" className="back-to-home">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
