import React, { createContext, useContext, useState } from "react";

// Criando o contexto
const DadosViagemContext = createContext();

// Hook customizado para acessar o contexto
export const useDadosViagem = () => useContext(DadosViagemContext);

// Provedor do contexto
export const DadosViagemProvider = ({ children }) => {
  const [ida, setIda] = useState("");
  const [destino, setDestino] = useState("");
  const [desembarque, setDesembarque] = useState("");
  const [motorista, setMotorista] = useState({})

  return (
    <DadosViagemContext.Provider
      value={{ ida, setIda, destino, setDestino, desembarque, setDesembarque, motorista, setMotorista }}
    >
      {children}
    </DadosViagemContext.Provider>
  );
};
