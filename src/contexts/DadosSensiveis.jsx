import React, { createContext, useState, useContext } from "react";

const DadosSensiveisContext = createContext();

export const DadosSensiveisProvider = ({ children }) => {
  const [dadosSensiveis, setDadosSensiveis] = useState(null);

  return (
    <DadosSensiveisContext.Provider
      value={{ dadosSensiveis, setDadosSensiveis }}
    >
      {children}
    </DadosSensiveisContext.Provider>
  );
};

export const useDadosSensiveis = () => useContext(DadosSensiveisContext);
