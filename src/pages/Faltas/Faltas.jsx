import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import { UserCircleMinus, DotsThreeVertical } from "@phosphor-icons/react";

import imgFalta from "../../assets/img-falta.svg";

import "./Faltas.css";
import { useQuery } from "react-query";
import useAuth from "../../contexts/AuthProvider/useAuth";

export function Faltas() {
  const [ausencias, setAusencias] = useState([]);
  const [ausenciasRecorrentes, setAusenciasRecorrentes] = useState([]);

  const formatData = (data) => {
    return data.map(day => day.substring(0, 3)).join(' | ');
  }

  const auth = useAuth();

  const { data, isLoading } = useQuery(["user"], () => auth.getUser(), {
    staleTime: 10000,
  });  

  const user = data?.user;

  if (isLoading || !user) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <HeaderFixo text={"Informar ausência"} tela="home" />
      <main className="main-faltas">
        {user.cnh ? (
          <div>
            <h1>Você não tem acesso a essa página</h1>
          </div>
        ) : (
          <>
            {ausenciasRecorrentes.length > 0 && (
              <>
                <p className="title-faltas">Ausências Recorrentes</p>
                <div className="card-faltas">
                  <div>
                    <UserCircleMinus size={36} color="#003B6D" />
                    <span>{formatData(ausenciasRecorrentes[0].data)}</span>
                  </div>
                  <DotsThreeVertical size={32} color="#AAAAAA" weight="bold" />
                </div>
              </>
            )}

            {ausencias.length > 0 && (
              <>
                <p className="title-faltas">Ausências</p>
                <div className="list-faltas">
                  {ausencias.map((ausencia) => (
                    <div className="card-faltas" key={ausencia.data}>
                      <div>
                        <UserCircleMinus size={36} color="#003B6D" />
                        <span>{ausencia.data}</span>
                      </div>
                      <DotsThreeVertical size={32} color="#AAAAAA" weight="bold" />
                    </div>
                  ))}
                </div>
              </>
            )}

            {ausencias.length === 0 && ausenciasRecorrentes.length === 0 && (
              <>
                <img src={imgFalta} alt="Nenhuma ausência registrada" />
                <h2>Nenhuma ausência registrada</h2>
                <span>
                  Até o momento você não informou nenhuma ausência a seu motorista.
                </span>
              </>
            )}

            <Link to={"informar-faltas"}>
              <button>Informar ausência</button>
            </Link>
          </>
        )}
      </main>

      <Footer home={false} presenca={true} percurso={false} perfil={false} />
    </div>
  );
}

