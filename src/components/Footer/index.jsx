import React from 'react'
import home from '../../assets/home.svg'
import { Link } from 'react-router-dom'
import presenca from '../../assets/presenca.svg'
import percurso from '../../assets/percurso.svg'
import perfil from '../../assets/perfil.svg'
import './footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
        <div>
            <Link to={'/home'}>
                <img src={home} alt="" />
                <p>Início</p>
            </Link>
            
        </div>
        <div>
            <Link to={'/presenca'}>
                <img src={presenca} alt="" />
                <p>Presença</p>
            </Link>
        </div>
        <div>
            <Link>
                <img src={percurso} alt="" />
                <p>Percurso</p>
            </Link>
        </div>
        <div>
            <Link>
                <img src={perfil} alt="" />
                <p>Perfil</p>
            </Link>
        </div>
    </footer>
  )
}

export default Footer