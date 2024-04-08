import React from 'react'
import seta from '../../assets/GoSeta.svg'
import './OpcoesPerfil.css'

const OpcoesPerfil = ({ img, text}) => {
  return (
    <div>
        <div className="opcao-perfil">
            <div className="inicio">
                <img src={img} />
                <p>{text}</p>
            </div>
            <img src={seta} /> 
        </div>
    </div>
  )
}

export default OpcoesPerfil