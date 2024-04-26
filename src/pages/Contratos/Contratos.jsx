import React from 'react'
import returnImg from "../../assets/Return.svg";
import telaContrato from "../../assets/contrato.svg"
import HeaderFixo from '../../components/HeaderFixo/headerFixo';
import divisoria from "../../assets/Divisoria.svg";
import { useContrato } from '../../contexts/Contrato';

const Contratos = () => {

  const {contrato} = useContrato();

  return (
    <div className='notificacao-container'>
        <HeaderFixo tela={"perfil"} img={returnImg} text={"Contratos"} />
        {contrato == null ? 
                <div className='notificacao-box'>
                <img src={telaContrato} alt="" />
                <p>Você ainda não firmou nenhum contrato</p>
            </div>
        :
        <div className="container-info">
          <div className="box-info-contrato">
            <div className="card-info-contrato">
              <p>
                <span>{contrato.motorista.title}</span>
              </p>
              <p>
                <span>Motorista - </span>
                {contrato.motorista.motorista}
              </p>
              <p>
                <span>Rota - </span>Santo André - São Caetano do Sul
              </p>
              <p>
                <span>Horário de início - </span>
                {contrato.motorista.horario[1]}
              </p>
            </div>
            <div className="divisoria-anuncio">
              <img src={divisoria} alt="" />
            </div>
            <div className="card-info-contrato">
              <p>
                <span>Embarque - </span>
                {contrato.ida}
              </p>
              <p>
                <span>Destino - </span>
                {contrato.destino}
              </p>
              {contrato.desembarque ? (
                <p>
                  <span>Desembarque - </span>
                  {contrato.desembarque}
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
                  <p>R$ {contrato.motorista.preco}</p>
                </div>
                <div className="card-info-box">
                  <p>Impostos / Taxas</p>
                  <div className="card-info-borda"></div>
                  <p>R$ {contrato.formattedPriceTaxa}</p>
                </div>
                {/* <img src={divisoria} alt="" /> */}
                <div className="card-info-box">
                  <p>Total do serviço</p>
                  <div className="card-info-borda-menor"></div>
                  <p>R$ {contrato.formattedPrice} /Mês</p>
                </div>
              </div>
            </div>
          </div>
        </div>
}
        
    </div>
  )
}

export default Contratos