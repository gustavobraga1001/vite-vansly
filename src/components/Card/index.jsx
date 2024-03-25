import React from 'react'
import star from '../../assets/star.svg'
import divisoria from '../../assets/Divisoria.svg'
import './card.css'

const Card = ( {img, title, local, preco, stars}) => {

    console.log(img, title, local, preco, stars)

  return (
    <div className='card-box'>
    <div className='card'>
      <img src={img} alt="" />
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

        <div className='linha'></div>
    </div>
    <img className='divisoria' src={divisoria} alt="" />
    </div>
  )
}

export default Card