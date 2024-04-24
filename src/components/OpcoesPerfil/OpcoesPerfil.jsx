import React from 'react';
import seta from '../../assets/GoSeta.svg';
import './OpcoesPerfil.css';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OpcoesPerfil = ({ img, text, sair, link }) => {

    const { signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout();
    navigate("/");
  };
  return (
    <div>
      <Link to={link} >
      <div className="opcao-perfil">
        {sair === true ? (
          <div className="inicio" onClick={handleSignOut}>
            <img src={img} alt="Imagem" />
            <p>{text}</p>
          </div>
        ) : (
          
          <div className="inicio">
            
              <img src={img} alt="Imagem" />
              <p>{text}</p>
          </div>
        )}
        <img src={seta} alt="Seta" />
      </div>
        </Link>
    </div>
  );
};

export default OpcoesPerfil;
