import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AdminUsersContext } from "../contexts/AdminUsersContext";
import { useContext } from "react";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentAdminUser } = useContext(AdminUsersContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        currentAdminUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    />
  );
};
