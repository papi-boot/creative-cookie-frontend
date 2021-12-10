/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "api/useFetch";
import { GlobalDataContext } from "context/GlobalData";
import ResetPasswordForm from "component/reset-password/ResetPasswordForm";
const ResetPassword = () => {
  const history = useHistory();
  const {
    setGlobalMessage,
    useNotify,
    splashScreenRef,
    setIsAuthenticated,
  } = React.useContext(GlobalDataContext);
  React.useEffect(() => {
    useFetch(null, "GET", "authenticate", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setIsAuthenticated(res.isAuthenticated);
            splashScreenRef.current.classList.add("d-none");
            history.push(localStorage.getItem("URL"));
          } else {
            localStorage.setItem(
              "URL",
              `${window.location.pathname}${window.location.search}`
            );
            splashScreenRef.current.classList.add("d-none");
          }
        } else {
          throw new Error(
            "Somethign went wrong. Plase try again or check your network."
          );
        }
      })
      .catch((err) => {});
  }, []);
  return (
    <Fragment>
      <ResetPasswordForm />
    </Fragment>
  );
};

export default ResetPassword;
