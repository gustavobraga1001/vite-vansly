import React from 'react'
import './headerFixo.css'

const HeaderFixo = ({img, text}) => {
  return (
    <header className='header-fixo'>
        <img src={img} alt="" />
        <p>{text}</p>
    </header>
  )
}

export default HeaderFixo