import "./Recursos.css";
import arImg from "../../assets/icons-recursos/ar.svg";
import assentoImg from "../../assets/icons-recursos/assento.svg";
import usbImg from "../../assets/icons-recursos/usb.svg";
import wifiImg from "../../assets/icons-recursos/wi-fi.svg";
import divisoria from "../../assets/Divisoria.svg";

const Recursos = () => {
  return (
    <div className="recursos-van">
      <h5>Recursos disponíveis no transporte</h5>

      <div className="recurso">
        <img src={arImg} />
        <p>Ar condicionado</p>
      </div>

      <div className="recurso">
        <img src={assentoImg} />
        <p>Assentos confortáveis</p>
      </div>

      <div className="recurso">
        <img src={usbImg} />
        <p>Estações USB</p>
      </div>

      <div className="recurso">
        <img src={wifiImg} />
        <p>Wi-fi</p>
      </div>
      <img className="divisoria-nova" src={divisoria} />
    </div>
  );
};

export default Recursos;
