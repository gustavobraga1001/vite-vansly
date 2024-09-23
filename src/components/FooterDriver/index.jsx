import React from "react";
import homeAcionado from "../../assets/icons/homeAcionado.svg";
import percursoAcionado from "../../assets/icons/percursoAcionado.svg";
import { Link } from "react-router-dom";
import presencaImg from "../../assets/icons/presenca.svg";
import FaltaAcionado from "../../assets/icons/faltas-acionado.svg";
import percursoImg from "../../assets/icons/percurso.svg";
import perfilImg from "../../assets/icons/perfil.svg";
import homeImg from "../../assets/icons/home.svg";
import perfilAcionado from "../../assets/icons/perfilAcionado.svg";
import { ChartDonut } from "@phosphor-icons/react";

export function FooterDriver({ home, estatistica, percurso, perfil }) {
  return (
    <footer className="footer">
      <div>
        <Link to={"/home"}>
          {home ? <img src={homeAcionado} alt="" /> : <img src={homeImg} />}
          <p>Início</p>
        </Link>
      </div>
      <div>
        <Link to={"/percurso"}>
          {percurso ? (
            <img src={percursoAcionado} alt="" />
          ) : (
            <img src={percursoImg} />
          )}
          <p>Percurso</p>
        </Link>
      </div>
      <div>
        <Link to={"/estatisticas"}>
          {estatistica ? (
            <ChartDonut size={47} color="rgba(0, 59, 109, 1)" weight="fill" />
          ) : (
            <ChartDonut
              size={37}
              color="rgba(170, 170, 170, 1)"
              weight="thin"
            />
          )}
          <p>Estatisticas</p>
        </Link>
      </div>
      <div>
        <Link to={"/perfil"}>
          {perfil ? (
            <img src={perfilAcionado} alt="" />
          ) : (
            <img src={perfilImg} />
          )}
          <p>Perfil</p>
        </Link>
      </div>
    </footer>
  );
}
