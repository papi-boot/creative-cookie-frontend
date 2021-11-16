/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useFetch } from "api/useFetch";
import { GlobalDataContext } from "context/GlobalData";
import NotificationTab from "pages-component/notification/NotificationTab.js";
const NotificationPage = () => {
  const {
    postReloader,
    setNotification,
    setGlobalMessage,
    useNotify,
  } = React.useContext(GlobalDataContext);
  React.useEffect(() => {
    // @TODO: Fetch notifications
    useFetch(null, "GET", "notification", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            setNotification(res.notification);
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
        <NotificationTab />
      </section>
    </Fragment>
  );
};

export default withRouter(NotificationPage);
