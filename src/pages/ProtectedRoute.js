import React from "react";
import { Redirect, Route } from "react-router-dom";
import { GlobalDataContext } from "../context/GlobalData";
const ProtectedRoute = ({ component: Component, ...res }) => {
  const { isAuthenticated } = React.useContext(GlobalDataContext);
  return (
    <Route
      {...res}
      render={(props) => {
        localStorage.setItem("URL",`${window.location.pathname}${window.location.search}`);
        if (isAuthenticated) {
          return <Component />;
        } else {
          return <Redirect
            to={{ pathname: '/authenticate', state: { from: props.location } }}
          />;
        }
      }}
    ></Route>
  );
};

export default ProtectedRoute;
