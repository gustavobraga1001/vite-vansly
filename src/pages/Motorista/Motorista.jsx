import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import imgTelaMotorista from "../../assets/img-tela-motorista.svg";

import "./Motorista.css";

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

        <button>Iniciar cadastro</button>
      </div>
    </div>
  );
};

export default Motorista;
