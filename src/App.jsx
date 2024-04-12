import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/Auth";
import { DadosSensiveisProvider } from "./contexts/DadosSensiveis";

function App() {
  return (
    <AuthProvider>
      <DadosSensiveisProvider>
        <RoutesApp />
      </DadosSensiveisProvider>
    </AuthProvider>
  );
}

export default App;
