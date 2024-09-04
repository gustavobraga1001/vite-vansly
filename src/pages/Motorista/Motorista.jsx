import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import imgTelaMotorista from "../../assets/img-tela-motorista.svg";

import "./Motorista.css";
import { Link } from "react-router-dom";

const Motorista = () => {
  return (
    <div className="motorista-iniciar-box">
      <HeaderFixo tela="perfil" />
      <div className="motorista-iniciar-info">
        <img className="motorista-iniciar-img" src={imgTelaMotorista} />
        <h1>Bem vindo a area de cadastramento para motoristas</h1>
        <p>
          Torne-se um dos nossos motoristas parceiros e comece a anunciar seus
          serviços no Vansly.
        </p>
        <Link to={"documentos"}>
          <button>Iniciar cadastro</button>
        </Link>
      </div>
    </div>
  );
};

export default Motorista;
