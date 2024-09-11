import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./anuncio.css";
import infoCards from "../Home/infoCard";
import Carousel from "../../components/Carrossel/Carrossel";
import returnImg from "../../assets/icons/return-anuncio.svg";
import shareImg from "../../assets/icons/Share.svg";
import InfoAnuncio from "../../components/InfoAnuncio/InfoAnuncio";
import Recursos from "../../components/Recursos/Recursos";
import Regras from "../../components/Regras/Regras";
import divisoria from "../../assets/Divisoria.svg";
import { useDadosViagem } from "../../contexts/DadosViagemContext";
import useAuth from "../../hooks/useAuth";

const Anuncio = () => {
  const { setMotorista } = useDadosViagem();
  const { id } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false); // Controle do popup

  const card = infoCards.find((card) => card.id == id);

  const submitAnuncio = () => {
    // Verifica se o usuário tem o role 2
    if (user.role === 2) {
      setShowPopup(true); // Mostra o popup
      return; // Bloqueia a navegação
    }

    setMotorista(card); // Continua a lógica se o role não for 2

    navigate(`/contrato/locais/${id}`)
  };

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
        <img src={divisoria} />
      </div>
      <Recursos />
      <div className="divisoria-anuncio">
        <img src={divisoria} />
      </div>
      <Regras />
      <div className="contratar" onClick={submitAnuncio}>
        <button>Contratar por R$ {card.preco} /Mês</button>
      </div>

      {/* Popup de aviso */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Acesso Negado</h2>
            <p>Você não tem acesso a este recurso.</p>
            <button onClick={() => setShowPopup(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Anuncio;
