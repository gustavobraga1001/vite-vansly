import React from 'react'
import img from '../../assets/Return.svg'
import HeaderFixo from '../../components/HeaderFixo/headerFixo'
import './percurso.css'
import { useJsApiLoader } from '@react-google-maps/api'
import Maps from '../../components/Maps/Maps'
import Footer from '../../components/Footer'

const Percurso = () => {

  return (
    <div className='box-percurso'>
        <HeaderFixo 
            img={img}
            text='Percurso'
        />
        <Maps />
        <Footer 
            home={false}
            presenca={false}
            percurso={true}
            perfil={false}
        />
    </div>
  )
}

export default Percurso