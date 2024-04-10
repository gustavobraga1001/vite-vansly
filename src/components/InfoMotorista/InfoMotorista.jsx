import "./infoMotorista.css"
import fotoMotorista from "../../assets/VansImg/foto-perfil-motor.svg"

const InfoMotorista = () => {
  return (
    <div className="info-moto">
        <div className="foto">
            <img src={fotoMotorista} />
        </div>
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
  )
}

export default InfoMotorista