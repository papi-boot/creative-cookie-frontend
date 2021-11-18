/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useFetch } from "api/useFetch";
import { GlobalDataContext } from "context/GlobalData";
import Prism from "prismjs";
import NotifAllList from "component/notification/NotifAllList";
const NotificationPage = () => {
  const {
    postReloader,
    setNotification,
    setGlobalMessage,
    useNotify,
    setShowCreatePostBtnMob,
    setCurrentURL,
  } = React.useContext(GlobalDataContext);
  React.useEffect(() => {
    setCurrentURL(window.location.pathname);
    localStorage.setItem("URL", window.location.pathname);
    document.body.classList.add("body-color-light");
    // @TODO: Fetch notifications
    setShowCreatePostBtnMob(false);
    useFetch(null, "GET", "notification", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            setNotification(res.notification);
            Prism.highlightAll();
          } else {
            setGlobalMessage(res.message);
            return;
          }
        } else {
          throw new Error("Somthing went wrong. Please try again or later");
        }
      })
      .catch((err) => {
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
      });
  }, [postReloader]);
  // @TODO: register scoket;

  return (
    <Fragment>
      <section className="notification-section">
        <NotifAllList />
      </section>
    </Fragment>
  );
};

export default withRouter(NotificationPage);
