import React from "react";
import RoutesApp from "./routes";
import { DadosSensiveisProvider } from "./contexts/DadosSensiveis";
import { DadosViagemProvider } from "./contexts/DadosViagemContext";
import { ContratoProvider } from "./contexts/Contrato";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  const client = new QueryClient();

  return (
    <AuthProvider>
      <ContratoProvider>
        <DadosSensiveisProvider>
          <DadosViagemProvider>
          <QueryClientProvider client={client}>
            <RoutesApp />
          </QueryClientProvider>
          </DadosViagemProvider>
        </DadosSensiveisProvider>
      </ContratoProvider>
    </AuthProvider>
  );
}

export default App;
