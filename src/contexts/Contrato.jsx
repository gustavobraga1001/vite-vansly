import React, { createContext, useState, useContext } from "react";

const ContratoContext = createContext();

export const ContratoProvider = ({ children }) => {
  const [contrato, setContrato] = useState(null);

  return (
    <ContratoContext.Provider
      value={{ contrato, setContrato }}
    >
      {children}
    </ContratoContext.Provider>
  );
};

export const useContrato = () => useContext(ContratoContext);
