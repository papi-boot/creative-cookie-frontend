import React, { Fragment } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { GlobalDataContext } from "./context/GlobalData";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Authenticate from "./pages/Authenticate";
import ToastMessage from "./component/global/ToastMessage";
import { usePreFetch } from "./api/usePreFetch";
const App = () => {
  const { isAuthenticated, globalStyle } = React.useContext(GlobalDataContext);
  const history = useHistory();
  usePreFetch();
  React.useEffect(() => {
    document.body.classList.add("body-color-light");
  }, []);
  return (
    <Fragment>
      <ToastMessage />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (isAuthenticated) {
              return history.push("/dashboard");
            } else {
              return history.push("/authenticate");
            }
          }}
        />
        <Route exact path="/authenticate" component={Authenticate} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Fragment>
  );
};

export default App;
