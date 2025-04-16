import { useEffect, useState } from "react";
import { FooterDriver } from "../../../components/FooterDriver";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import Api from "../../../contexts/AuthProvider/services/api";
import PercursoImg from "../../../assets/percursoImg.svg";
import { useQuery } from "react-query";

export function PercursoDriver() {
  const [date, setDate] = useState(new Date().toISOString());
  const [hasRouteActive, setHasRouteActive] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  useEffect(() => {
    setHasRouteActive(localStorage.getItem("routeActive"));
  }, []);

  async function getRoute() {
    try {
      const response = await Api.get(`get-route/${hasRouteActive}`);

      if (!response.data || !response.data.route) {
        return {};
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  const { data, isLoading: isLoadingPoints, refetch } = useQuery(
    ["points"],
    () => getRoute(),
    {
      staleTime: 10000,
      enabled: !!hasRouteActive,
    }
  );

  // 🔥 Criação da rota e atualização automática da view
  async function startRoute() {
    if (!hasRouteActive) {
      try {
        const response = await Api.post("create-route", { date, period: selectedPeriod });
        localStorage.setItem("routeActive", response.data.route.id);
        setHasRouteActive(response.data.route.id); // ✅ Atualiza o estado local
        refetch(); // ✅ Atualiza a view automaticamente
      } catch (error) {
        console.error(error);
      }
    }
  }

  // 🔥 Validação de ponto e atualização automática
  const validPoint = async (pointId) => {
    try {
      await Api.patch("confirm-boarding", { stopId: pointId });
      refetch(); // ✅ Atualiza automaticamente após a validação
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 Finalização da rota e atualização automática
  const finishRoute = () => {
    localStorage.removeItem("routeActive");
    setHasRouteActive(null); // ✅ Atualiza o estado local
    refetch(); // ✅ Atualiza automaticamente após finalizar
  };

  const allStopsCompleted = data?.route?.stops?.every(stop => stop.status === true);

  return (
    <div>
      <HeaderFixo tela="home" text="Percurso" />
      
      {hasRouteActive === null ? (
        <div className="start-route">
          <div className="not-route-active-box">
            <img src={PercursoImg} alt="" />
            <h1>Nenhum trajeto ativo</h1>
            <p>Nenhuma viagem foi iniciada ainda. Se deseja iniciar o trajeto, clique no botão abaixo.</p>
          </div>
          <label>Selecione o período da rota: </label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="MANHA">Manhã</option>
            <option value="TARDE">Tarde</option>
            <option value="NOITE">Noite</option>
          </select>
          <button className="container-item-off-button" onClick={startRoute}>
            Iniciar Viagem
          </button>
        </div>
      ) : null}

      <div className="container-percurso">
        {data?.route?.stops?.map((stop, index) => {
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
                {index === firstIncompleteIndex && !stop.status ? (
                  <button onClick={() => validPoint(stop.id)}>Confirmar embarque</button>
                ) : null}
              </div>
            </div>
          );
        })}
        
        {allStopsCompleted && (
          <div>
            <button className="container-item-off-button" onClick={finishRoute}>
              Finalizar Rota
            </button>
          </div>
        )}
      </div>

      <FooterDriver percurso />
    </div>
  );
}
