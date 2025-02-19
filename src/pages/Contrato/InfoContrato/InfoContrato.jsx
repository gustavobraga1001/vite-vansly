import returnImg from "../../../assets/icons/return-anuncio.svg";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import { useNavigate, useParams } from "react-router-dom";
import divisoria from "../../../assets/Divisoria.svg";
import "./InfoContrato.css";
import { useDadosViagem } from "../../../contexts/DadosViagemContext";
import Api from "../../../contexts/AuthProvider/services/api";
import { useQuery } from "react-query";
import useAuth from "../../../contexts/AuthProvider/useAuth";


const InfoContrato = () => {
  const { id } = useParams();

  const { contrato } = useDadosViagem();
  const auth = useAuth();

  const navigate = useNavigate();

  console.log(contrato)

  const taxa = 48.0;
  const number = contrato.announcement.monthlyAmount
  const total = taxa + number;
  const formattedPriceTaxa = taxa
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const formattedPrice = total
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const { data, isLoading } = useQuery(["user"], () => auth.getUser(), {
    staleTime: 10000,
  });  

  const user = data?.user;

  if (isLoading || !user) {
    return <p>Carregando...</p>;
  }

  const submitContrato = async () => {
    try {
      await Api.post("/contracts", {
        "period": contrato.period.toUpperCase(),
        "boarding": contrato.boarding,
        "landing": contrato.boarding,
        "institution": contrato.institution,
        "monthlyAmount": parseFloat(formattedPrice),
        "status": true,
        "userId" : user.id,
        "driverId": contrato.announcement.driver.id
    } );
    } catch (error) {
      return null;
    }


    navigate("/proposta")
  };

  return (
    <div className="container-info">
      <HeaderFixo
        tela={`contrato/locais/${id}`}
        img={returnImg}
        text={"Informações do Contrato"}
        backColor={"#003B6D"}
        textColor={"#FFFFFF"}
      />
      <div className="box-info-contrato">
        <div className="card-info-contrato">
          <p>
            <span>{contrato.announcement.title}</span>
          </p>
          <p>
            <span>Motorista - </span>
            {contrato.announcement.driver.name}
          </p>
          <p>
            <span>Horário de início - </span>
            {contrato.period}
          </p>
        </div>
        <div className="divisoria-anuncio">
          <img src={divisoria} alt="" />
        </div>
        <div className="card-info-contrato">
          <p>
            <span>Embarque - </span>
            {contrato.boarding}
          </p>
          <p>
            <span>Destino - </span>
            {contrato.institution}
          </p>
          {contrato.landing ? (
            <p>
              <span>Desembarque - </span>
              {contrato.landing}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="divisoria-anuncio">
          <img src={divisoria} alt="" />
        </div>
        <div className="card-info-final">
          <h1>Preço final do contrato</h1>
          <div className="card-info-contrato">
            <div className="card-info-box">
              <p>Preço do serviço</p>
              <div className="card-info-borda"></div>
              <p>R$ {contrato.announcement.monthlyAmount}</p>
            </div>
            <div className="card-info-box">
              <p>Impostos / Taxas</p>
              <div className="card-info-borda"></div>
              <p>R$ {formattedPriceTaxa}</p>
            </div>
            <img src={divisoria} alt="" />
            <div className="card-info-box">
              <p>Total do serviço</p>
              <div className="card-info-borda-menor"></div>
              <p>R$ {formattedPrice} /Mês</p>
            </div>
          </div>
        </div>
        <div className="box-prosseguir">
          <button className="prosseguir" onClick={submitContrato}>
            Contratar por R$ {formattedPrice} /Mês
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoContrato;
