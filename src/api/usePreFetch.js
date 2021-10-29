/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useFetch } from "./useFetch";
import { GlobalDataContext } from "../context/GlobalData";
import { useHistory } from "react-router-dom";
export const usePreFetch = () => {
  const {
    dataReloader,
    setDataReloader,
    setIsAuthenticated,
    setUserInfo,
    setGlobalMessage,
    useNotify,
  } = React.useContext(GlobalDataContext);
  const history = useHistory();
  React.useLayoutEffect(() => {
    // @TODO: Check authentication for saving cookies
    useFetch(null, "GET", "authenticate", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            setIsAuthenticated(res.isAuthenticated);
            setUserInfo(res.user);
            history.push("/dashboard");
          } else {
            history.push("/authenticate");
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