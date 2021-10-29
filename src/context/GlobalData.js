import React from "react";
import { useNotify } from "../api/useNotify";
import { lightTheme, darkTheme } from "../style/root";
export const GlobalDataContext = React.createContext();

const GlobalDataProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({});
  const [globalMessage, setGlobalMessage] = React.useState("");
  const [globalStyle, setGlobalStyle] = React.useState(lightTheme);
  const [dataReloader, setDataReloader] = React.useState(false);
  const [authenticateTab, setAuthenticateTab] = React.useState("Login");
  const value = {
    isAuthenticated,
    globalMessage,
    globalStyle,
    userEmail,
    userInfo,
    dataReloader,
    authenticateTab,
    setIsAuthenticated,
    setDataReloader,
    setUserEmail,
    setUserInfo,
    setAuthenticateTab,
    setGlobalMessage,
    setGlobalStyle,
    useNotify
  };
  return (
    <GlobalDataContext.Provider value={value}>
      {props.children}
    </GlobalDataContext.Provider>
  );
};

export default GlobalDataProvider;
