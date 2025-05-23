import RoutesApp from "./routes";
import { DadosSensiveisProvider } from "./contexts/DadosSensiveis";
import { DadosViagemProvider } from "./contexts/DadosViagemContext";
import { ContratoProvider } from "./contexts/Contrato";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthProvider";
import { DriverProvider } from "./contexts/DriverProvider";
import { AnnouncementsProvider } from "./contexts/AnnouncementProvider/AnnouncementContext";

function App() {
  const client = new QueryClient();

  return (
    <AuthProvider>
      <AnnouncementsProvider>
        <DriverProvider>
        <ContratoProvider>
          <DadosSensiveisProvider>
            <DadosViagemProvider>
            <QueryClientProvider client={client}>
              <RoutesApp />
            </QueryClientProvider>
            </DadosViagemProvider>
          </DadosSensiveisProvider>
        </ContratoProvider>
        </DriverProvider>
      </AnnouncementsProvider>
    </AuthProvider>
  );
}

export default App;
