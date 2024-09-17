import React from "react";
import img from "../../assets/Return.svg";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import "./percurso.css";
import Footer from "../../components/Footer";

const Percurso = () => {
  return (
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

        </div>
      </div>

      <Footer home={false} presenca={false} percurso={true} perfil={false} />
    </div>
  );
};

export default Percurso;
