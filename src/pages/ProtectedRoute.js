import React from "react";
import { Redirect, Route } from "react-router-dom";
import { GlobalDataContext } from "../context/GlobalData";
const ProtectedRoute = ({ component: Component, ...res }) => {
  const { isAuthenticated } = React.useContext(GlobalDataContext);
  return (
    <Route
      {...res}
      render={(props) => {
        if (isAuthenticated) {
          return <Component />;
        } else {
          return <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />;
        }
      }}
    ></Route>
  );
};

export default ProtectedRoute;
