import React from 'react'
import returnImg from "../../../assets/icons/return-anuncio.svg";
import HeaderFixo from '../../../components/HeaderFixo/headerFixo';
import infoCards from '../../Home/infoCard';
import { Link, useParams } from 'react-router-dom';
import divisoria from '../../../assets/Divisoria.svg'
import "./InfoContrato.css"

const InfoContrato = () => {
    const { id } = useParams();
    const card = infoCards.filter((card) => card.id == id);
  return (
    <div className='container-info'>
        <HeaderFixo
        tela={`contrato/locais/${id}`}
        img={returnImg}
        text={"Informações do Contrato"}
        backColor={"#003B6D"}
        textColor={"#FFFFFF"}
      />
      <div className='box-info-contrato'>
        <div className='card-info-contrato'>
            <p><span>Van 1</span></p>
            <p><span>Motorista - </span>Elias Mendez</p>
            <p><span>Rota - </span>Santo André - São Caetano do Sul</p>
            <p><span>Horário de início - </span>17:30</p>
        </div>
        <div className="divisoria-anuncio">
        <img src={divisoria} alt="" />
      </div>
        <div className='card-info-contrato'>
            <p><span>Embarque - </span>Embarque - R. Antônio Bastos 697, Santo André, SP</p>
            <p><span>Destino - </span>Uscs - Conceição</p>
            <p><span>Desembarque - </span>R. Antônio Bastos 697, Santo André, SP</p>
        </div>
        <div className="divisoria-anuncio">
        <img src={divisoria} alt="" />
      </div>
        <div className='card-info-final'>
          <h1>Preço final do contrato</h1>
          <div className='card-info-contrato'>
            <div className='card-info-box'>
              <p>Preço do serviço</p>
              <div className='card-infor-borda'></div>
              <p>R$ 400,00</p>
            </div>
            <div className='card-info-box'>
              <p>Impostos / Taxas</p>
              <div className='card-infor-borda'></div>
              <p>R$ 48,00</p>
            </div>
        <img src={divisoria} alt="" />
            <div className='card-info-box'>
              <p>Total do serviço</p>
              <div className='card-infor-borda'></div>
              <p>R$ 448,00 /Mês</p>
            </div>
          </div>
        </div>
        {/* <div className="divisoria-anuncio">
        <img src={divisoria} alt="" />
      </div> */}
        <div className="box-prosseguir">
        <Link to={`/proposta`}>
          <button className="prosseguir">Contratar por R$ 448,00 /Mês</button>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default InfoContrato