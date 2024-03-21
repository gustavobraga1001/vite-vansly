import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import sino from '../../assets/sino.png'
import mapa from '../../assets/mapa.png'
import pesquisa from '../../assets/pesquisa.png'
import './home.css'
import Footer from "../../components/Footer";
import BemVindo from "../../components/BemVindo";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="box-home">
      <header className="header">
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
      <main>
        <BemVindo />
      </main>
      <Button text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>

      <Footer />
    </div>
  );
};

export default Home;