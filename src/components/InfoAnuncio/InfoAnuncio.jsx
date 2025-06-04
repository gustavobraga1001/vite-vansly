import "./infoAnuncio.css";
import star from "../../assets/star.svg";
import divisoria from "../../assets/Divisoria.svg";
import Stars from "../Stars/Stars";
import TabelaHorarios from "../TabelaHorarios/TabelaHorarios";
import InfoMotorista from "../InfoMotorista/InfoMotorista";

const InfoAnuncio = ({
  title,
  stars,
  locals,
  instituicoes,
  capacityVehicle,
  motorista,
}) => {
  // const number = parseFloat(stars.replace(",", "."));

  function citiesArray(str) {
    return str.split(' - ');
  }

  const cities = citiesArray(locals);

  return (
    <div className="box-info-anuncio">
      <h1>{title}</h1>
      <div className="nota">
        <div className="avaliacao">
          <Stars count={stars} img={star} />
          <p>Avaliação: {stars}</p>
        </div>
      </div>

      <InfoMotorista nomeMotor={motorista} />

      <div className="divisoria-anuncio">
        <img src={divisoria} alt="" />
      </div>

      <div className="info-van">
        <div className="regiao">
          <h5>Regiões de atendimento</h5>
          <div>
            {cities.map((local) => (
              <p key={local}>{local}</p>
            ))}
          </div>
        </div>  

        <div className="divisoria-van">
          <img src={divisoria} alt="" />
        </div>

        {/* <div className="inst-destino">
          <h5>Instituições de destino</h5>
          {instituicoes.map((instituicao) => (
            <p key={instituicao}>{instituicao}</p>
          ))}
        </div> */}

        {/* <div className="divisoria-van">
          <img src={divisoria} alt="" />
        </div> */}

        <div className="vagas">
          <h5>Horários e vagas disponíveis</h5>
        </div>

        <TabelaHorarios capacityVehicle={capacityVehicle} />
      </div>
    </div>
  );
};

export default InfoAnuncio;
