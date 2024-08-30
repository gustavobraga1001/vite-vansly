import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/Auth";
import { DadosSensiveisProvider } from "./contexts/DadosSensiveis";
import { DadosViagemProvider } from "./contexts/DadosViagemContext";
import { ContratoProvider } from "./contexts/Contrato";

function App() {
  return (
    <AuthProvider>
      <ContratoProvider>
        <DadosSensiveisProvider>
          <DadosViagemProvider>
            <RoutesApp />
          </DadosViagemProvider>
        </DadosSensiveisProvider>
      </ContratoProvider>
    </AuthProvider>
  );
}

export default App;
