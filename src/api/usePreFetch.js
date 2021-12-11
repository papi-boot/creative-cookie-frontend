/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useFetch } from "./useFetch";
import { GlobalDataContext } from "context/GlobalData";
import { useHistory } from "react-router-dom";
export const usePreFetch = () => {
  const {
    dataReloader,
    setIsAuthenticated,
    setUserInfo,
    setGlobalMessage,
    useNotify,
  } = React.useContext(GlobalDataContext);
  const history = useHistory();
  React.useLayoutEffect(() => {
    // localStorage.setItem("URL", `${window.location.pathname}${window.location.search}`);
    // @TODO: Check authentication for saving cookies
    useFetch(null, "GET", "authenticate", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            // useNotify(res.message, "success");
            setIsAuthenticated(res.isAuthenticated);
            setUserInfo(res.user);
            history.replace(localStorage.getItem("URL"));
          } else {
            localStorage.setItem(
              "URL",
              `${window.location.pathname}${window.location.search}`
            );
            if (localStorage.getItem("URL") === "/") {
              return history.replace("/authenticate");
            }
            if (
              localStorage.getItem("URL") ===
              `${window.location.pathname}${window.location.search}`
            ) {
              return history.replace(localStorage.getItem("URL"));
            } else {
              return history.replace("/authenticate");
            }
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
  }, [dataReloader]);
};
