import React, { Fragment } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { GlobalDataContext } from "./context/GlobalData";
import { Container } from "react-bootstrap";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Authenticate from "./pages/Authenticate";
import ToastMessage from "./component/global/ToastMessage";
import NotificationPage from "./pages/NotificationPage";
import Profile from "./pages/Profile";
import NavTop from "./component/global/NavTop";
import NavBottom from "./component/global/NavBottom";
import { usePreFetch } from "./api/usePreFetch";
const App = () => {
  const { isAuthenticated, globalStyle, postLimit } = React.useContext(GlobalDataContext);
  const history = useHistory();
  usePreFetch();

  return (
    <Fragment>
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
        <div className="main">
          <header className="main-header">
            <NavTop />
          </header>
          <Container>
            <ToastMessage />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute
              exact
              path="/notification"
              component={NotificationPage}
            />
            <ProtectedRoute exact path="/profile" component={Profile} />
          </Container>
          <NavBottom />
        </div>
      </Switch>
    </Fragment>
  );
};

export default App;
