import React from 'react'
import returnImg from "../../../assets/icons/return-anuncio.svg";
import HeaderFixo from '../../../components/HeaderFixo/headerFixo';
import infoCards from '../../Home/infoCard';
import { useParams } from 'react-router-dom';
import "./InfoContrato.css"

const InfoContrato = () => {
    const { id } = useParams();
    const card = infoCards.filter((card) => card.id == id);
  return (
    <div className='container-info'>
        <HeaderFixo
        tela={`anuncio/${id}`}
        img={returnImg}
        text={"Informações do Contrato"}
        backColor={"#003B6D"}
        textColor={"#FFFFFF"}
      />
        <div className='card-info-contrato'>
            <p><span>Van 1</span></p>
            <p><span>Motorista - </span>Elias Mendez</p>
            <p><span>Rota - </span>Santo André - São Caetano do Sul</p>
            <p><span>Horário de início - </span>17:30</p>
        </div>
    </div>
  )
}

export default InfoContrato