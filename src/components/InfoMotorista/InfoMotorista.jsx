import "./infoMotorista.css";
import fotoMotorista from "../../assets/VansImg/foto-perfil-motor.svg";
import divisoria from "../../assets/Divisoria.svg";

const InfoMotorista = () => {
  return (
    <div>
      <div className="info-moto">
        <img src={fotoMotorista} />
        <div className="motorista">
          <div className="nome">
            <h5>Motorista: </h5>
            <p>Elias Mendez</p>
          </div>
          <div className="tempo">
            <p>Motorista há 1 mês</p>
          </div>
        </div>
      </div>
      {/* <img className="divisoria-nova" src={divisoria} /> */}
    </div>
  );
};

export default InfoMotorista;
