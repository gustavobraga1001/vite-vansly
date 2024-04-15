import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/Auth";
import { DadosSensiveisProvider } from "./contexts/DadosSensiveis";
import { DadosViagemProvider } from "./contexts/DadosViagemContext";

function App() {
  return (
    <AuthProvider>
      <DadosSensiveisProvider>
        <DadosViagemProvider>
          <RoutesApp />
        </DadosViagemProvider>
      </DadosSensiveisProvider>
    </AuthProvider>
  );
}

export default App;
