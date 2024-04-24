import React from 'react'
import returnImg from "../../assets/Return.svg";
import telaContrato from "../../assets/contrato.svg"
import HeaderFixo from '../../components/HeaderFixo/headerFixo';
// import "./Notificacoes.css"

const Contratos = () => {
  return (
    <div className='notificacao-container'>
        <HeaderFixo tela={"perfil"} img={returnImg} text={"Contratos"} />
        <div className='notificacao-box'>
            <img src={telaContrato} alt="" />
            <p>Você ainda não firmou nenhum contrato</p>
        </div>
    </div>
  )
}

export default Contratos