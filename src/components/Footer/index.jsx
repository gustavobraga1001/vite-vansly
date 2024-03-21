import React from 'react'
import home from '../../assets/home.svg'
import presenca from '../../assets/presenca.svg'
import percurso from '../../assets/percurso.svg'
import perfil from '../../assets/perfil.svg'
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