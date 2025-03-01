import { createContext, useState } from "react";

export const DriverContext = createContext();

// eslint-disable-next-line react/prop-types
export const DriverProvider = ({ children }) => {
  const [driver, setDriver] = useState({});

  return (
    <DriverContext.Provider
      value={{ driver, setDriver }}
    >
      {children}
    </DriverContext.Provider>
  );
};