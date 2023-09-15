import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isLogin } from "../../../utils/index";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() && restricted ? (
          <Navigate to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
