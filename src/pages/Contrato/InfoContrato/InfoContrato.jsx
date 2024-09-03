import React from "react";
import returnImg from "../../../assets/icons/return-anuncio.svg";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import divisoria from "../../../assets/Divisoria.svg";
import "./InfoContrato.css";
import { useDadosViagem } from "../../../contexts/DadosViagemContext";
import { useContrato } from "../../../contexts/Contrato";

import { v4 as uuidv4 } from 'uuid';

const InfoContrato = () => {
  const { id } = useParams();

  const { ida, destino, desembarque, motorista } = useDadosViagem();
  const { contrato, setContrato } = useContrato();

  const navigate = useNavigate();

  const taxa = 48.0;
  const number = parseFloat(motorista.preco.replace(",", "."));
  const total = taxa + number;
  const formattedPriceTaxa = taxa
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const formattedPrice = total
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const submitContrato = () => {

    const newContract = {
      id: uuidv4(),
      motorista: {
        id: motorista.id,
        title: motorista.title,
        nome: motorista.motorista,
        horarios: motorista.horarios
      },
      ida,
      desembarque,
      destino,
      precoFinal: formattedPrice
    }

    setContrato(newContract);

    localStorage.setItem("contratos", JSON.stringify([newContract]));

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
            <span>{motorista.title}</span>
          </p>
          <p>
            <span>Motorista - </span>
            {motorista.motorista}
          </p>
          <p>
            <span>Horário de início - </span>
            {motorista.horarios.manha.horario}
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
              <p>R$ {motorista.preco}</p>
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
