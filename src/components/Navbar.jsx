import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./index.css";
import logo from "../assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Navbar = () => {
  const navigate = useNavigate();
  const [colorChange, setColorchange] = useState(false);

  const handleLogout = () => {
    swal({
      title: "Are you sure ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.setItem("setLoggedIn", false);
        localStorage.removeItem("data");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("donor");
        localStorage.removeItem("staff");
        sessionStorage.clear();
        navigate("/login");
      }
    });
  };

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const Donor = localStorage.getItem("donor");
  const donor = Donor === "null" && '';
  const Staff = localStorage.getItem("staff");

  return (
    <>
      {/* <!-- Navbar --> */}
      <header>
        <nav
          className={
            colorChange
              ? "main-header navbar navbar-expand navbar-white bg-white"
              : "main-header navbar navbar-expand navbar-white navbar-light"
          }
        >
          <div className="navbar_logo">
            <img src={logo} height={50} alt="logo" />
            <h2>Dashboard</h2>
          </div>

          <div>
            <button onClick={handleLogout} className="logout_btn btn">
              <strong>Logout</strong>
            </button>
            {Staff && (
              <Link to="#" className="btn admin-btn">
                Staff
              </Link>
            )}

            {donor && (
              <Link to="#" className="btn admin-btn">
                Donor
              </Link>
            )}

          </div>
        </nav>
      </header>

      <Sidebar />
    </>
  );
};

export default Navbar;
