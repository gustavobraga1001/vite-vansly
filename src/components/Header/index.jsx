import React from 'react'
import sino from '../../assets/sino.svg'
import mapa from '../../assets/loc.svg'
import pesquisa from '../../assets/pesquisa.svg'
import './header.css'

const Header = () => {
  return (
    <header className={'header'}>
        <div className="titulo-home">
          <h1>Olá, Usuário</h1>
          <img src={sino} />
        </div>
        <div className="loc-home">
          <p>Localização</p>
          <div>
            <img src={mapa} alt="" />
            <select name="" id="">
              <option value="Santo Ándre - SP">Santo Ándre - SP</option>
            </select>
          </div>
        </div>
        <div className="pesquisa">
            <img src={pesquisa} alt="" />
            <input type="text" placeholder="Para onde?"/>
        </div>
      </header>
  )
}

export default Header