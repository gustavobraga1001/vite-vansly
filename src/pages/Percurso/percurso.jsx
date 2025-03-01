import img from "../../assets/Return.svg";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import { PercursoDriver } from "../Driver/Percurso";
import useAuth from "../../contexts/AuthProvider/useAuth";
import { useQuery } from "react-query";
import "./percurso.css";
import Api from "../../contexts/AuthProvider/services/api";
import { useState, useEffect } from "react";

const Percurso = () => {
  const auth = useAuth();
  const [error, setError] = useState(''); // Aqui você armazena o erro

  async function getRoute() {
    try {
      const date = new Date();
      date.setUTCHours(0, 0, 0, 0);

      const dateNow = new Date();
      const hours = dateNow.getHours();

      let period = '';

      if (hours >= 6 && hours < 14) {
        period = 'MANHA';
      } else if (hours >= 14 && hours < 18) {
        period = 'TARDE';
      } else if (hours >= 18 && hours < 24) {
        period = 'NOITE';
      }

      const response = await Api.post("get-route", { date, period });
      console.log("Resposta da API:", response);

      if (!response.data || !response.data.route) {
        setError('Nenhuma rota encontrada.');
        return {};  // Retorna um objeto vazio caso não encontre a rota
      }

      // Caso contrário, limpa o erro
      setError('');
      return response.data;  
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Erro desconhecido");
      return {};  // Retorna um objeto vazio em caso de erro
    }
  }

  const { data, isLoading } = useQuery(["user"], () => auth.getUser(), {
    staleTime: 10000,
  });  

  const { data: routeData, isLoading: isLoadingRoute } = useQuery(["route"], getRoute);  

  const user = data?.user;
  const route = routeData?.route;

  // Verifique se há erro e se o estado 'route' é atualizado corretamente
  useEffect(() => {
    if (route) {
      setError('');
    }
  }, [route]);

  if (isLoading || !user || isLoadingRoute) {
    return <Loading />;
  }

  return user.cnh === undefined ? ( 
    <div className="box-percurso">
      <div className="main-percurso">
        <HeaderFixo tela="home" img={img} text="Percurso" />
        
        {error ? (
          <div className="main-error">
            <h2>{error}</h2>
            <p>Nenhum trajeto foi iniciado até agora. Quando seu motorista iniciar o trajeto iremos te avisar.</p>
          </div>
        ) : (
          <div className="container-percurso">
            {route?.stops && (
              route.stops.map((stop, index) => {
                return (
                  <div
                    key={stop.id}
                    className={`container-item-percurso ${!stop.status ? 'container-item-off' : ''} 
                              ${index === route.stops.length - 1 ? "item-final" : ""}`}
                  >
                    <p className={`${!stop.validated_at ? 'hour-invisible' : ''}`}>
                        {stop.validated_at ? 
                          new Date(new Date(stop.validated_at).getTime() + 3 * 60 * 60 * 1000)
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
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      
      <Footer home={false} presenca={false} percurso={true} perfil={false} />
    </div>
  ) : (
    <PercursoDriver />
  );
};

export default Percurso;
