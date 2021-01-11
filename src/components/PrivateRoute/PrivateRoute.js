import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({ children, ...rest }) {
  const { authTokens } = useAuth();
  // const { currentUser } = useAuth();
  // console.log(currentUser);

  return (
    <Route {...rest}>
      {authTokens ? (
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
