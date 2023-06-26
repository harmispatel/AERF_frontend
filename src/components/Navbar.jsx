import React from "react";
import Sidebar from "./Sidebar";
import './index.css'
import logo from '../assets/images/Logo.png'

const Navbar = () => {
  return (
    <>
      {/* <!-- Navbar --> */}
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <div className="navbar_logo">
          <img src={logo} height={50} alt="logo" />
          <h2>Dashboard</h2>
        </div>

        <button className="btn admin-btn">Admin</button>
      </nav>

      <Sidebar />
    </>
  );
};

export default Navbar;
