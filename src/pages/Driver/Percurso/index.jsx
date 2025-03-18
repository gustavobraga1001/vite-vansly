import { useEffect, useState } from "react";
import { FooterDriver } from "../../../components/FooterDriver";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import Api from "../../../contexts/AuthProvider/services/api";
import { useQuery } from "react-query";

export function PercursoDriver() {
  const [date, setDate] = useState(new Date('2025-03-18T00:00:00.000Z').toISOString());
  const [hasRouteActive, setHasRouteActive] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(""); // Criação do estado para controlar o valor selecionado

  useEffect(() => {
    setHasRouteActive(localStorage.getItem("routeActive"));
  }, []);

  async function getRoute() {
    try {
      const response = await Api.get(`get-route/${hasRouteActive}`);

      if (!response.data || !response.data.route) {
        return {}; // Retorna um objeto vazio caso não encontre a rota
      }

      // Caso contrário, retorna os dados da rota
      return response.data;
    } catch (error) {
      console.error(error);
      return {}; // Retorna um objeto vazio em caso de erro
    }
  }

  const { data, isLoading: isLoadingPoints ,refetch} = useQuery(
    ["points"],
    () => getRoute(),
    {
      staleTime: 10000,
      enabled: !!hasRouteActive,
    }
  )
  
  async function startRoute() {
    if (hasRouteActive === null) {
      try {
        console.log(`Data: ${date}`);
        console.log(`Período: ${selectedPeriod}`);

        const response = await Api.post("create-route", { date, period: selectedPeriod });
        console.log(response)
        localStorage.setItem("routeActive", response.data.route.id)
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const validPoint = async (pointId) => {
    console.log(pointId)

    const response = await Api.patch("confirm-boarding", { stopId: pointId });
    console.log("Resposta da API:", response);
    refetch();

  }

  const allStopsCompleted = data?.route?.stops?.every(stop => stop.status === true);

  return (
    <div>
      <HeaderFixo tela="home" text="Percurso" />
      {hasRouteActive === null ? (
        <div className="start-route">
          <label htmlFor="">Selecione o periodo da rota: </label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="MANHA">Manhã</option>
            <option value="TARDE">Tarde</option>
            <option value="NOITE">Noite</option>
          </select>
          <button className="container-item-off-button" onClick={startRoute}>Iniciar Rota</button>
        </div>
      ) : null}

      <div className="container-percurso">
        {data?.route?.stops && data.route.stops.map((stop, index) => {
          // Encontrar o primeiro índice com status false
          const firstIncompleteIndex = data.route.stops.findIndex((stop) => !stop.status);
          return (
            <div
              key={stop.id}
              className={`container-item-percurso ${!stop.status ? 'container-item-off' : ''} 
                         ${index === data.route.stops.length - 1 ? "item-final" : ""}`}
            >
              <p className={`${!stop.validated_at ? 'hour-invisible' : ''}`}>
                {stop.validated_at 
                  ? new Date(new Date(stop.validated_at).getTime() + 3 * 60 * 60 * 1000)
                      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })  
                  : "00:00"}
              </p>

              <div className="container-barra">
                <div className="bola-barra"></div>
                <span className="traco-barra"></span>
              </div>
              <div>
                <p className="field-address">{stop.address}</p>
                <span></span>
                {/* Exibe o botão apenas se for o primeiro elemento com status false */}
                {index === firstIncompleteIndex && !stop.status ? (
                  <button onClick={() => validPoint(stop.id)}>Confirmar embarque</button>
                ) : null}
              </div>
            </div>
          );
        })}
        {allStopsCompleted && (
          <div>
            <button className="container-item-off-button" onClick={() => localStorage.removeItem("routeActive")}>
              Finalizar Rota
            </button>
          </div>
        )}
      </div>

      <FooterDriver percurso />
    </div>
  );
}
