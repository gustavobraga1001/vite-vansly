import { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import img from "../../assets/Return.svg";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import { PercursoDriver } from "../Driver/Percurso";
import useAuth from "../../contexts/AuthProvider/useAuth";
import Api from "../../contexts/AuthProvider/services/api";
import "./percurso.css";

const Percurso = () => {
  const auth = useAuth();
  const [error, setError] = useState("");

  
  // Buscar usuário
  const { data: userData, isLoading: isUserLoading, error: userError } = useQuery(
    ["user"],
    async () => auth.getUser(),
    );

  const user = userData?.user;


  // Pré-cálculo do período
  const period = useMemo(() => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours < 14) return "MANHA";
    if (hours >= 14 && hours < 18) return "TARDE";
    return "NOITE";
  }, []);


  // Buscar rota
  const { data: routeData, isLoading: isRouteLoading } = useQuery(
    ["route", period],
    async () => {
      try {
        const date = new Date().toISOString().split("T")[0];
        const response = await Api.post("get-route-student", { date, period });
        if (!response.data?.route) throw new Error("Nenhuma rota encontrada.");
        return response.data;
      } catch (error) {
        setError(
          error.response?.data?.message || error.message || "Erro desconhecido"
        );
        return null;
      }
    },
  );

  const route = routeData?.route;

  // Estados de carregamento unificados
  if (isUserLoading || isRouteLoading) return <Loading />;


  // Usuário não encontrado
  if (!user) {
    return (
      <div className="main-error">
        <h2>Nenhum usuário encontrado</h2>
        <p>Por favor, tente novamente mais tarde.</p>
      </div>
    );
  }

  // Usuário com CNH (motorista)
  if (user.cnh) {
    return <PercursoDriver />;
  }

  // Renderizar trajeto do estudante
  return (
    <div className="box-percurso">
      <div className="main-percurso">
        <HeaderFixo tela="home" img={img} text="Percurso" />
        {error ? (
          <div className="main-error">
            <h2>{error}</h2>
            <p>
              Nenhum trajeto foi iniciado até agora. Quando seu motorista iniciar
              o trajeto iremos te avisar.
            </p>
          </div>
        ) : (
          <div className="container-percurso">
            {route?.stops?.map((stop, index) => (
              <div
                key={stop.id}
                className={`container-item-percurso ${
                  !stop.status ? "container-item-off" : ""
                } ${index === route.stops.length - 1 ? "item-final" : ""}`}
              >
                <p className={`${!stop.validated_at ? "hour-invisible" : ""}`}>
                  {stop.validated_at
                    ? new Date(
                        new Date(stop.validated_at).getTime() +
                          3 * 60 * 60 * 1000
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
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
            ))}
          </div>
        )}
      </div>
      <Footer home={false} presenca={false} percurso={true} perfil={false} />
    </div>
  );
};

export default Percurso;
