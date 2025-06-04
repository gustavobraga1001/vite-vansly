import "./infoMotorista.css";
import fotoMotorista from "../../assets/VansImg/foto-perfil-motor.svg";
import divisoria from "../../assets/Divisoria.svg";

const InfoMotorista = ({ nomeMotor }) => {
  return (
    <div>
      <div className="info-moto">
        <div className="motorista">
          <div className="nome">
            <h5>Motorista: </h5>
            <p>{nomeMotor}</p>
          </div>
        </div>
      </div>
      {/* <img className="divisoria-nova" src={divisoria} /> */}
    </div>
  );
};

export default InfoMotorista;
