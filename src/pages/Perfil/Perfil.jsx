import React from 'react'
import HeaderFixo from '../../components/HeaderFixo/headerFixo'
import returnImg from '../../assets/Return.svg'
import imgPerfil from '../../assets/fotoPerfil.svg'
import editarPerfil from '../../assets/editarPerfil.svg'
import './Perfil.css'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import OpcoesPerfil from '../../components/OpcoesPerfil/OpcoesPerfil'

const Perfil = () => {
  return (
    <div className='container-perfil'>
        <HeaderFixo tela={"home"} img={returnImg} text={"Perfil"}/>
        <div className="box-perfil">
            <div className="foto">
                <img src={imgPerfil} />
            </div>

            <div className="info">
                <h3>Clara Montenegro</h3>
                <p>clara.montenegro@email.com</p>
                <button className="button-perfil">Editar Perfil</button>
            </div>    
    </div>
    <OpcoesPerfil />
    <Footer 
        home={false}
        presenca={false}
        percurso={false}
        perfil={true}
      />
    </div>
  )
}

export default Perfil