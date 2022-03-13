// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div
        className="navlogocontainer"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <h1>Contractio</h1>
      </div>
      <div className="navlistcontainer">
        <ul className="navlist">
          <a href="/">
            <li className="navlistelements">HOME</li>
          </a>
      {
        (localStorage.getItem("admin") && localStorage.getItem("token"))?
        <a href="/gov">
            <li className="navlistelements">CONTRACTS</li>
        </a>: <a href="/bid">
            <li className="navlistelements">CONTRACTS</li>
        </a>
      }
          
          <a href="/register">
            <li className="navlistelements">REGISTER</li>
          </a>
          <a href="/login">
            <li className="navlistelements">LOGIN</li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
