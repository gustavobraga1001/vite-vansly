import React from 'react'
import home from '../../assets/home.png'
import presenca from '../../assets/presenca.png'
import percurso from '../../assets/percurso.png'
import perfil from '../../assets/perfil.png'
import './footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
        <div>
            <img src={home} alt="" />
            <p>Início</p>
        </div>
        <div>
            <img src={presenca} alt="" />
            <p>Presença</p>
        </div>
        <div>
            <img src={percurso} alt="" />
            <p>Percurso</p>
        </div>
        <div>
            <img src={perfil} alt="" />
            <p>Perfil</p>
        </div>
    </footer>
  )
}

export default Footer