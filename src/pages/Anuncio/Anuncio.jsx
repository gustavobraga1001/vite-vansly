import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./anuncio.css";
import Carousel from "../../components/Carrossel/Carrossel";
import returnImg from "../../assets/icons/return-anuncio.svg";
import shareImg from "../../assets/icons/Share.svg";
import InfoAnuncio from "../../components/InfoAnuncio/InfoAnuncio";
import Recursos from "../../components/Recursos/Recursos";
import Regras from "../../components/Regras/Regras";
import divisoria from "../../assets/Divisoria.svg";
import ImgVan from "../../assets/VansImg/vaninterna.jpg";
import { useDadosViagem } from "../../contexts/DadosViagemContext";
import { useQuery } from "react-query";
import Api from "../../contexts/AuthProvider/services/api";

const Anuncio = () => {
  const navigate = useNavigate()

  const { announcementId } = useParams()
  const [showPopup, setShowPopup] = useState(false); // Controle do popup

  const { setContrato } = useDadosViagem()

  const { data: announcement, isLoading } = useQuery(
    ["announcement", announcementId], 
    () => Api.get(`get-specific-announcement/${announcementId}`).then(res => res.data),
    {
      staleTime: 30000,
      select: (data) => data.announcement, // Retorna apenas o anúncio
    }
  );
  
  if (isLoading || !announcement) {
    return <p>Carregando...</p>;
  }

  function pushPage(){
    setContrato({announcement})
    navigate(`/contrato/locais/${announcement.id}`)
  }

  console.log(announcement)

  // const submitAnuncio = () => {
  //   // Verifica se o usuário tem o role 2
  //   if (user.role === 2) {
  //     setShowPopup(true); // Mostra o popup
  //     return; // Bloqueia a navegação
  //   }

  //   setMotorista(card); // Continua a lógica se o role não for 2

  //   navigate(`/contrato/locais/${id}`)
  // };

  return (
    <div className="box-anuncio">
      <div className="card-anuncio">
        <Link to={"/home"}>
          <img src={returnImg} className="img-return" />
        </Link>
        <img src={shareImg} className="img-compartilhar" />
        <Carousel images={announcement.images} />
      </div>
      <InfoAnuncio
        title={announcement.title}
        stars={announcement.stars}
        locals={announcement.city}
        // instituicoes={card.instituicoes}
        // horarios={card.horarios}
        // vagas={card.vagas}
        motorista={announcement.driver.name}
      />
      <div className="divisoria-anuncio">
        <img src={divisoria} />
      </div>
      <Recursos />
      <div className="divisoria-anuncio">
        <img src={divisoria} />
      </div>
      <Regras />
      <div className="contratar">
        <button onClick={pushPage}>Contratar por R$ {announcement.monthlyAmount} /Mês</button>
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
