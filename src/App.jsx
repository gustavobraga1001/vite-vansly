import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/Auth";
import { DadosSensiveisProvider } from "./contexts/DadosSensiveis";
import { DadosViagemProvider } from "./contexts/DadosViagemContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <AuthProvider>
      <DadosSensiveisProvider>
        <DadosViagemProvider>
          <UserProvider>
            <RoutesApp />
          </UserProvider>
        </DadosViagemProvider>
      </DadosSensiveisProvider>
    </AuthProvider>
  );
}

export default App;
