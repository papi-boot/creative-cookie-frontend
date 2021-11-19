/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { GlobalDataContext } from "./context/GlobalData";
import { Container } from "react-bootstrap";
import { usePreFetch } from "./api/usePreFetch";
import { useSocket } from "api/useSocket";
import ProtectedRoute from "./pages/ProtectedRoute";
import EditorField from "context/EditorField";
import Dashboard from "./pages/Dashboard";
import Authenticate from "./pages/Authenticate";
import ToastMessage from "./component/global/ToastMessage";
import NotificationPage from "./pages/NotificationPage";
import Profile from "./pages/Profile";
import ProfileListMobile from "./pages/ProfileListMobile";
import PostContent from "./pages/PostContent";
import NavTop from "./component/global/NavTop";
import NavBottom from "./component/global/NavBottom";
import NewPostNotify from "component/socket/NewPostNotify";
const App = () => {
  const { newPostNotifyRef, postReloader } = React.useContext(
    GlobalDataContext
  );
  usePreFetch();
  React.useEffect(() => {
    useSocket().emit("pre connect", "Pre Connect");
  }, [postReloader]);
  // @TODO: register socket Listener
  React.useEffect(() => {
    useSocket().on("pre connect", (value) => {});
    useSocket().on("new post", (value) => {
      newPostNotifyRef.current.openToast();
      newPostNotifyRef.current.toggleDataReloader();
    });
    useSocket().on("edit post", (value) => {
      newPostNotifyRef.current.toggleDataReloader();
    });
    useSocket().on("delete post", (value) => {
      newPostNotifyRef.current.toggleDataReloader();
    });
    useSocket().on("like post", (value) => {
      newPostNotifyRef.current.toggleDataReloader();
    });
    useSocket().on("add comment", (value) => {
      newPostNotifyRef.current.toggleDataReloader();
    });
    useSocket().on("edit comment", (value) => {
      newPostNotifyRef.current.toggleDataReloader();
    });
    useSocket().on("delete comment", (value) => {
      newPostNotifyRef.current.toggleDataReloader();
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
      <Switch>
        <Route exact path="/authenticate" component={Authenticate} />
        <div className="main">
          <div className="d-none">
            <EditorField/>
          </div>
          <NewPostNotify ref={newPostNotifyRef} />
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
            <ProtectedRoute
              exact
              path="/post/:post_id"
              component={PostContent}
            />
            ;
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
    </Fragment>
  );
};

export default App;
