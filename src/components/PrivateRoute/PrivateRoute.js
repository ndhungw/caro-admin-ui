import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  return (
    <Route {...rest}>
      {auth.currentUser ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )}
    </Route>
  );
}
