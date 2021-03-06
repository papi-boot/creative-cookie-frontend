/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { GlobalDataContext } from "./context/GlobalData";
import { Container } from "react-bootstrap";
import { usePreFetch } from "./api/usePreFetch";
import { useSocket } from "api/useSocket";
import ProtectedRoute from "./pages/ProtectedRoute";
import ProfileInformationModal from "component/profile-modal/ProfileInformationModal";
import Dashboard from "./pages/Dashboard";
import Authenticate from "./pages/Authenticate";
import ToastMessage from "./component/global/ToastMessage";
import NotificationPage from "./pages/NotificationPage";
import Profile from "./pages/Profile";
import ProfileListMobile from "./pages/ProfileListMobile";
import PostContent from "./pages/PostContent";
import ResetPassword from "./pages/ResetPassword";
import NavTop from "./component/global/NavTop";
import NavBottom from "./component/global/NavBottom";
import NewPostNotify from "component/socket/NewPostNotify";
import SplashScreen from "component/global/SplashScreen";
const App = () => {
  const {
    newPostNotifyRef,
    postReloader,
    isAuthenticated,
    splashScreenRef,
    profInfoModalRef,
  } = React.useContext(GlobalDataContext);
  usePreFetch();
  React.useEffect(() => {
    useSocket().emit("pre connect", "Pre Connect");
  }, [postReloader]);
  // @TODO: register socket Listener
  React.useEffect(() => {
    useSocket().emit("user connected", "user connected");
    useSocket().on("pre connect", (value) => {});
    useSocket().on("new post", (value) => {
      newPostNotifyRef.current.openToast();
      if (newPostNotifyRef.current) {
        newPostNotifyRef.current.toggleDataReloader();
      }
    });
    useSocket().on("edit post", (value) => {
      if (newPostNotifyRef.current) {
        newPostNotifyRef.current.toggleDataReloader();
      }
    });
    useSocket().on("delete post", (value) => {
      if (newPostNotifyRef.current) {
        newPostNotifyRef.current.toggleDataReloader();
      }
    });
    useSocket().on("like post", (value) => {
      if (newPostNotifyRef.current) {
        newPostNotifyRef.current.toggleDataReloader();
      }
    });
    useSocket().on("add comment", (value) => {
      if (newPostNotifyRef.current) {
        newPostNotifyRef.current.toggleDataReloader();
      }
    });
    useSocket().on("edit comment", (value) => {
      if (newPostNotifyRef.current) {
        newPostNotifyRef.current.toggleDataReloader();
      }
    });
    useSocket().on("delete comment", (value) => {
      if (newPostNotifyRef.current) {
        newPostNotifyRef.current.toggleDataReloader();
      }
    });
    useSocket().on("user connected", (value) => {
      if (newPostNotifyRef.current) {
        newPostNotifyRef.current.toggleDataReloader();
      }
    });
    useSocket().on("user disconnected", (value) => {
      if (newPostNotifyRef.current) {
        newPostNotifyRef.current.toggleDataReloader();
      }
    });
    useSocket().on("user login", (value) => {
      if (newPostNotifyRef.current) {
        newPostNotifyRef.current.toggleDataReloader();
      }
    });
    useSocket().on("user logout", (value) => {
      if (newPostNotifyRef.current) {
        newPostNotifyRef.current.toggleDataReloader();
      }
    });
    useSocket().on("connect again", (value) => {
      useSocket().on("connect", () => {
        return;
      });
    });
  }, []);
  return (
    <Fragment>
      <ToastMessage />
      <SplashScreen />
      {isAuthenticated ? (
        <Switch>
          <Route exact path="/authenticate" component={Authenticate} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <div className="main">
            <NewPostNotify ref={newPostNotifyRef} />
            <ProfileInformationModal ref={profInfoModalRef} />
            <header className="main-header">
              <NavTop />
            </header>
            <Container>
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <ProtectedRoute
                exact
                path="/notification"
                component={NotificationPage}
              />
              <ProtectedRoute exact path="/post" component={PostContent} />
              <ProtectedRoute exact path="/profile" component={Profile} />
              <ProtectedRoute
                exact
                path="/profile-mob"
                component={ProfileListMobile}
              />
            </Container>
            <NavBottom />
          </div>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/authenticate" component={Authenticate} />
          <Route exact path="/reset-password" component={ResetPassword} />
        </Switch>
      )}
    </Fragment>
  );
};

export default App;
