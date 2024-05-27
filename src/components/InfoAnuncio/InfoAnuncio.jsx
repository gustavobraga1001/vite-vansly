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
  horarios,
  motorista
}) => {
  const number = parseFloat(stars.replace(",", "."));
  return (
    <div className="box-info-anuncio">
      <h1>{title}</h1>
      <div className="nota">
        <div className="avaliacao">
          <Stars count={number} img={star} />
          <p>{stars}</p>
        </div>
        <div className="qtdAvaliacao">
          <p>154</p>
          <a href>Avaliações</a>
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
            {locals.map((local, i) => (
              <p key={i}>{local}</p>
            ))}
          </div>
        </div>

        <div className="divisoria-van">
          <img src={divisoria} alt="" />
        </div>

        <div className="inst-destino">
          <h5>Instituições de destino</h5>
          {instituicoes.map((instituicao, i) => (
            <p key={i}>{instituicao}</p>
          ))}
        </div>

        <div className="divisoria-van">
          <img src={divisoria} alt="" />
        </div>

        <div className="vagas">
          <h5>Horários e vagas disponíveis</h5>
        </div>

        <TabelaHorarios horarios={horarios}/>
      </div>
    </div>
  );
};

export default InfoAnuncio;
