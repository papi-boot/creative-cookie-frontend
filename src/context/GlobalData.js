import React from "react";
import { useNotify } from "../api/useNotify";
import { lightTheme, darkTheme } from "../style/root";
export const GlobalDataContext = React.createContext();

const GlobalDataProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const [userEmail, setUserEmail] = React.useState("");
  const [globalMessage, setGlobalMessage] = React.useState("");
  const [globalStyle, setGlobalStyle] = React.useState(lightTheme);
  const value = {
    isAuthenticated,
    globalMessage,
    globalStyle,
    setIsAuthenticated,
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
