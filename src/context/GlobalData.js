import React from "react";

export const GlobalDataContext = React.createContext();

const GlobalDataProvider = (props) => {
  const value = {};
  return (
    <GlobalDataContext.Provider value={value}>
      {props.children}
    </GlobalDataContext.Provider>
  );
};

export default GlobalDataProvider;
