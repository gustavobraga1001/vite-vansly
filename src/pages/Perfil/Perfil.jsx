import React, { useEffect } from "react";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import returnImg from "../../assets/Return.svg";
import imgPerfil from "../../assets/icons/perfilAcionado.svg";
import Footer from "../../components/Footer";
import OpcoesPerfil from "../../components/OpcoesPerfil/OpcoesPerfil";
import opcoes from "./Opcoes";
import { Link } from "react-router-dom";

import "./Perfil.css";
import useAuth from "../../hooks/useAuth";

const Perfil = () => {
  const { user } = useAuth();

  return (
    <div className="container-perfil">
      <HeaderFixo tela={"home"} img={returnImg} text={"Perfil"} />
      <div className="box-perfil">
        <div className="foto-perfil">
          <img src={imgPerfil} />
        </div>
        <div className="info">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <Link>
            <button className="button-perfil">Editar Perfil</button>
          </Link>
        </div>
      </div>
      {opcoes.map((info, i) => {
        if (info.onClick) {
          return (
            <OpcoesPerfil
              key={i}
              img={info.img}
              text={info.text}
              sair={true}
              link={info.link}
            />
          );
        } else {
          return (
            <OpcoesPerfil
              key={i}
              img={info.img}
              text={info.text}
              link={info.link}
            />
          );
        }
      })}
      <Footer home={false} presenca={false} percurso={false} perfil={true} />
    </div>
  );
};

export default Perfil;
