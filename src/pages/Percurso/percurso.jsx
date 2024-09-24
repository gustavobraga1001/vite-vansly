import React from "react";
import img from "../../assets/Return.svg";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import "./percurso.css";
import Footer from "../../components/Footer";
import useAuth from "../../hooks/useAuth";
import { PercursoDriver } from "../Driver/Percurso";

const Percurso = () => {
  const { user } = useAuth()

  return user.role === 1 ? (
    <div className="box-percurso">
      <div className="main-percurso">
        <HeaderFixo tela="home" img={img} text="Percurso" />
        <div className="container-percurso">
          <div className="container-item-percurso">
            <p>16:43</p>
            <div className="container-barra"><div className="bola-barra"></div> <span className="traco-barra"></span></div>
            <div>
              <p>Rua das figuerias, 150</p>
              <span>Jardim Bela vista</span>
            </div>
          </div>

          <div className="container-item-percurso">
            <p>16:43</p>
            <div className="container-barra"><div className="bola-barra"></div> <span className="traco-barra"></span></div>
            <div>
              <p>Rua das figuerias, 150</p>
              <span>Jardim Bela vista</span>
            </div>
          </div>

          <div className="container-item-percurso container-item-off">
            <p>16:58</p>
            <div className="container-barra">
              <div className="bola-barra"></div>
              <span className="traco-barra"></span>
            </div>
            <div>
              <p>Avenida Portugal, 1010</p>
              <span>Centro, Santo André - SP, 09040-001</span>
            </div>
          </div>

          <div className="container-item-percurso container-item-off item-final">
            <p>16:58</p>
            <div className="container-barra">
              <div className="bola-barra"></div>
              <span className="traco-barra"></span>
            </div>
            <div>
              <p>Universidade Municipal de São Caetano do Sul - Campus Conceição</p>
              <span>R. Conceição, 321 - Santo Antônio, São Caetano do Sul - SP, 09530-060</span>
            </div>
          </div>

        </div>
      </div>

      <Footer home={false} presenca={false} percurso={true} perfil={false} />
    </div>
  ) : (
    <PercursoDriver />
  )
};

export default Percurso;
