import React, { useState } from "react";
import Logo from "../../assets/images/Logo.png";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import LoginService from "../../services/auth";
import swal from "sweetalert";

export const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null);
    setIsSubmitting(true);

    if (!loginData.email) {
      setError("Please enter your email.");
      return;
    }

    if (!loginData.password) {
      setError("Please enter your password.");
      return;
    }
    setIsSubmitting(true);

    let formdata = new FormData();
    formdata.append("email_id", loginData.email);
    formdata.append("password", loginData.password);

    LoginService.login(formdata)
      .then((response) => {

        if (response.success === true) {
          const accessToken = response?.data?.token.access;
          const staff = response?.data.staff_id;
          const donor = response?.data.donor_id;
          const user_priority = response?.data.user_priority;

          setLoggedIn(true);
          localStorage.setItem("data", JSON.stringify(response.data));
          localStorage.setItem("setLoggedIn", true);
          localStorage.setItem("staff", staff);
          localStorage.setItem("donor", donor);
          localStorage.setItem("userPriority", user_priority);
          localStorage.setItem("accessToken", accessToken);
          navigate("/project-report/summary-report");
        } else {
          swal({
            title: "oops!",
            text: response.message,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        localStorage.setItem("accessToken", "");

        console.log(err);
      });
  };

  return (
    <>
      <div className="login_header">
        <Link to="/">
          <img src={Logo} height="60" alt="logo" />
        </Link>
      </div>
      <div className="login_main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9">
              <div className="login_inr">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="login_info">
                      <div className="login_title">
                        <h1>Dashboard</h1>
                      </div>
                      <div className="login_info_inr">
                        <div className="login_info_inr_title">
                          <h3>Welcome</h3>
                          <p>Please enter your credentials to continue</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              name="email"
                              onChange={(e) => handleChange(e)}
                              placeholder="Registered Email ID"
                            />
                            {error && error === "Please enter your email." && (
                              <p className="text-danger">{error}</p>
                            )}
                          </div>
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="password"
                              name="password"
                              onChange={(e) => handleChange(e)}
                              placeholder="Password"
                            />
                            {error &&
                              error === "Please enter your password." && (
                                <p className="text-danger">{error}</p>
                              )}
                          </div>

                          <div className="form-group mt-4 mb-0">
                            <button
                              type="submit"
                              className="btn login_bt"
                              //   disabled={isSubmitting}
                            >
                              Login
                            </button>
                            <p>
                              <Link to="/forget-password">
                                Forgot Credentials?
                              </Link>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
