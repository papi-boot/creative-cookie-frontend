/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useFetch } from "api/useFetch";
import { GlobalDataContext } from "context/GlobalData";
import ProfileLayout from "pages-component/profile/ProfileLayout";
const Profile = () => {
  const {
    setGlobalMessage,
    useNotify,
    postReloader,
    setIsAuthenticated,
    setUserInfo,
    splashScreenRef
  } = React.useContext(GlobalDataContext);
  React.useEffect(() => {
    // @TODO: pre set profile Information
    useFetch({ check: true }, "POST", "profile", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            return;
          } else {
            return;
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch((err) => {});
    // @TODO: Check authentication for saving cookies
    useFetch(null, "GET", "authenticate", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            setIsAuthenticated(res.isAuthenticated);
            setUserInfo(res.user);
            splashScreenRef.current.classList.add("d-none");
          } else {
            return;
          }
        } else {
          throw new Error(
            "Somethign went wrong. Plase try again or check your network."
          );
        }
      })
      .catch((err) => {
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
      });
  }, [postReloader]);
  return (
    <Fragment>
      <section className="section-profile">
        <ProfileLayout />
      </section>
    </Fragment>
  );
};

export default withRouter(Profile);
