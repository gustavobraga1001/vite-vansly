import "./infoAnuncio.css";
import star from "../../assets/star.svg";
import divisoria from "../../assets/Divisoria.svg";
import Stars from "../Stars/Stars";

const InfoAnuncio = ({
  title,
  stars,
  locals,
  instituicoes,
  horario,
  vagas,
}) => {
  const number = parseFloat(stars.replace(",", "."));
  console.log(number, stars);
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
      <div className="info-van">
        <div className="regiao">
          <h5>Regiões de atendimento: </h5>
          {locals.map((local) => (
            <p>{local}</p>
          ))}
        </div>

        <div className="inst-destino">
          <h5>Instituições de destino: </h5>
          {instituicoes.map((instituicao, i) => (
            <p key={i}>{instituicao}</p>
          ))}
        </div>
        <div className="horario">
          <h5>Horários de início:</h5>
          {horario.map((hora, i) => (
            <p key={i}>{hora}</p>
          ))}
        </div>

        <div className="vagas">
          <h5>Vagas dísponiveis: {vagas}</h5>
        </div>
      </div>
      {/* <img className="divisoria-nova" src={divisoria} /> */}
    </div>
  );
};

export default InfoAnuncio;
