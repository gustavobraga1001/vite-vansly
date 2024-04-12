import "./anuncio.css";
import infoCards from "../Home/infoCard";
import { Link, useParams } from "react-router-dom";
import Carousel from "../../components/Carrossel/Carrossel";
import returnImg from "../../assets/icons/return-anuncio.svg";
import shareImg from "../../assets/icons/Share.svg";
import InfoAnuncio from "../../components/InfoAnuncio/InfoAnuncio";
import InfoMotorista from "../../components/InfoMotorista/InfoMotorista";
import Recursos from "../../components/Recursos/Recursos";
import Regras from "../../components/Regras/Regras";
import divisoria from "../../assets/Divisoria.svg";

const Anuncio = () => {
  const { id } = useParams();
  const card = infoCards.filter((card) => card.id == id);
  return (
    <div className="box-anuncio">
      <div className="card-anuncio">
        <Link to={"/home"}>
          <img src={returnImg} className="img-return" />
        </Link>
        <img src={shareImg} className="img-compartilhar" />
        <Carousel images={card[0].img} />
      </div>
      <InfoAnuncio
        title={card[0].title}
        stars={card[0].stars}
        locals={card[0].local}
        instituicoes={card[0].instituicoes}
        horario={card[0].horario}
        vagas={card[0].vagas}
      />
      <div className="divisoria-anuncio">
        <img src={divisoria} alt="" />
      </div>
      <InfoMotorista nomeMotor={card[0].motorista}/>
      <div className="divisoria-anuncio">
        <img src={divisoria} />
      </div>
      <Recursos />
      <div className="divisoria-anuncio">
        <img src={divisoria} alt="" />
      </div>
      <Regras />
      <div className="contratar">
        <Link to={`/contrato/locais/${id}`}>
          <button>Contratar por R$ {card[0].preco} /Mês</button>
        </Link>
      </div>
    </div>
  );
};

export default Anuncio;
