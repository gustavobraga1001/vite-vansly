import React from "react";
import returnImg from "../../../assets/icons/return-anuncio.svg";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import infoCards from "../../Home/infoCard";
import { Link, useParams } from "react-router-dom";
import divisoria from "../../../assets/Divisoria.svg";
import "./InfoContrato.css";
import { useDadosViagem } from "../../../contexts/DadosViagemContext";

const InfoContrato = () => {
  const { id } = useParams();
  const card = infoCards.filter((card) => card.id == id);

  const { ida, destino, desembarque, setIda, setDestino, setDesembarque } =
    useDadosViagem();
  const taxa = 48.0;
  const number = parseFloat(card[0].preco.replace(",", "."));
  const total = taxa + number;
  const formattedPriceTaxa = taxa
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const formattedPrice = total
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
            <span>{card[0].title}</span>
          </p>
          <p>
            <span>Motorista - </span>
            {card[0].motorista}
          </p>
          <p>
            <span>Rota - </span>Santo André - São Caetano do Sul
          </p>
          <p>
            <span>Horário de início - </span>
            {card[0].horario[1]}
          </p>
        </div>
        <div className="divisoria-anuncio">
          <img src={divisoria} alt="" />
        </div>
        <div className="card-info-contrato">
          <p>
            <span>Embarque - </span>
            {ida}
          </p>
          <p>
            <span>Destino - </span>
            {destino}
          </p>
          {desembarque ? (
            <p>
              <span>Desembarque - </span>
              {desembarque}
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
              <p>R$ {card[0].preco}</p>
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
        {/* <div className="divisoria-anuncio">
        <img src={divisoria} alt="" />
      </div> */}
        <div className="box-prosseguir">
          <Link to={`/proposta`}>
            <button className="prosseguir">
              Contratar por R$ {formattedPrice} /Mês
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoContrato;
