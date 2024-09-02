import Footer from "../../components/Footer";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";

import imgFalta from "../../assets/img-falta.svg";

import "./Faltas.css";
import { Link } from "react-router-dom";

export function Faltas() {
  return (
    <div>
      <HeaderFixo text={"Informar ausência"} tela="home" />
      <main className="main-faltas">
        <img src={imgFalta} alt="" />
        <h2>Nenhuma ausência registrada</h2>
        <span>
          Até o momento você não informou nenhuma ausência a seu motorista.
        </span>

        <button>
          <Link to={"informar-faltas"}>Informar ausência</Link>
        </button>
      </main>

      <Footer home={false} presenca={true} percurso={false} perfil={false} />
    </div>
  );
}
