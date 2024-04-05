import React from 'react'
import star from '../../assets/star.svg'
import divisoria from '../../assets/Divisoria.svg'
import './card.css'
import Carrossel from '../Carrossel/Carrossel'

const Card = ( {img, title, local, preco, stars}) => {
  return (
    <div className='card'>
      <Carrossel images={img} />
      <div className='container-card'>
          <p>{title}</p>
          <div className='card-info'>
              <p>{local}</p>
              <div className='card-star'>
                  <img src={star} alt="" />
                  <p>{stars}</p>
              </div>
          </div>
          <p>R$ {preco} /Mês</p>
        </div>
    </div>
  )
}

export default Card