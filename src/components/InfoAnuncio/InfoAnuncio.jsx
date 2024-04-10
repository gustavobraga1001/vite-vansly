import "./infoAnuncio.css";
import star from "../../assets/star.svg";
import divisoria from "../../assets/Divisoria.svg";
import Stars from "../Stars/Stars";

const InfoAnuncio = ({ title, stars, locals }) => {
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
          <p>USCS - Conceição</p>
          <p>USCS - Centro</p>
          <p>USCS - Barcelona</p>
        </div>
        <div className="horario">
          <h5>Horários de início:</h5>
          <p>06:00</p>
          <p>18:00</p>
        </div>

        <div className="vagas">
          <h5>Vagas dísponiveis: 06</h5>
        </div>
      </div>
      {/* <img className="divisoria-nova" src={divisoria} /> */}
    </div>
  );
};

export default InfoAnuncio;
