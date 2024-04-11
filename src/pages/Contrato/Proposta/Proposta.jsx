import React from 'react'
import propostaImg from "../../../assets/proposta.svg"
import './Proposta.css'

const Proposta = () => {
  return (
    <div className='container-proposta'>
        <img src={propostaImg} alt="" />
        <h1>Proposta Enviada!</h1>
        <p>Sua proposta será enviada ao motorista para análise
            caso rejeitada você receberá uma mensagem.
        </p>
    </div>
  )
}

export default Proposta