import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import { UserCircleMinus, DotsThreeVertical } from "@phosphor-icons/react";

import imgFalta from "../../assets/img-falta.svg";

import "./Faltas.css";

export function Faltas() {
  const [ausencias, setAusencias] = useState([]);

  useEffect(() => {
    const prevAusencias = JSON.parse(localStorage.getItem("ausencias"));

    if (prevAusencias) {
      setAusencias(prevAusencias);
    }
  }, []); // O array de dependências está vazio para rodar o efeito apenas uma vez

  return (
    <div>
      <HeaderFixo text={"Informar ausência"} tela="home" />
      <main className="main-faltas">
        {ausencias.length > 0 ? (
          <>
            <p className="title-faltas">Ausencias</p>
            <div className="list-faltas">
              {ausencias.map((data) => {
                return (
                  <div className="card-faltas" key={data}>
                    <div>
                      <UserCircleMinus size={36} color="#003B6D" />
                      <span>{data}</span>
                    </div>
                    <DotsThreeVertical
                      size={32}
                      color="#AAAAAA"
                      weight="bold"
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <img src={imgFalta} alt="Nenhuma ausência registrada" />
            <h2>Nenhuma ausência registrada</h2>
            <span>
              Até o momento você não informou nenhuma ausência a seu motorista.
            </span>
          </>
        )}

        <button>
          <Link to={"informar-faltas"}>Informar ausência</Link>
        </button>
      </main>

      <Footer home={false} presenca={true} percurso={false} perfil={false} />
    </div>
  );
}
