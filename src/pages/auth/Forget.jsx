import React, { useState } from "react";
import Logo from "../../assets/images/Logo.png";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import LoginService from "../../services/auth";
import swal from "sweetalert";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null);
    setIsSubmitting(true);

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setIsSubmitting(true);

    const data = `email_id=${email}`

    LoginService.forget(data)
      .then(res=>{
        if (res.success === true) {
          swal({
            title: "Success!",
            text: res.message,
            icon: "success",
          });
          navigate("/login");
        } else {
          swal({
            title: "oops!",
            text: res.message,
            icon: "error",
          });
          navigate("/forget-password");
        }
      }).catch(err=>{
        console.log(err);
      })
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
                          <h3>Reset Your Password</h3>
                          <p>Please enter your email</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              name="email"
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Registered Email ID"
                            />
                            {error && error === "Please enter your email." && (
                              <p className="text-danger">{error}</p>
                            )}
                          </div>

                          <div className="form-group mt-4 mb-0">
                            <button type="submit" className="btn login_bt">
                              Submit
                            </button>
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

export default Forget;
