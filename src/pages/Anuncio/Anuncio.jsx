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
import { useDadosViagem } from "../../contexts/DadosViagemContext";

const Anuncio = () => {
  const { motorista, setMotorista } = useDadosViagem();

  const { id } = useParams();
  const card = infoCards.find(card => card.id == id);

  
  const submitAnuncio = () => {
    setMotorista(card);
    
  }
  return (
    <div className="box-anuncio">
      <div className="card-anuncio">
        <Link to={"/home"}>
          <img src={returnImg} className="img-return" />
        </Link>
        <img src={shareImg} className="img-compartilhar" />
        <Carousel images={card.img} />
      </div>
      <InfoAnuncio
        title={card.title}
        stars={card.stars}
        locals={card.local}
        instituicoes={card.instituicoes}
        horarios={card.horarios}
        vagas={card.vagas}
        motorista={card.motorista}
      />
      <div className="divisoria-anuncio">
        <img src={divisoria} alt="" />
      </div>
      <Recursos />
      <div className="divisoria-anuncio">
        <img src={divisoria} alt="" />
      </div>
      <Regras />
      <div className="contratar" onClick={submitAnuncio}>
        <Link to={`/contrato/locais/${id}`} >
          <button>Contratar por R$ {card.preco} /Mês</button>
        </Link>
      </div>
    </div>
  );
};

export default Anuncio;
