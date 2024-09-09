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
import {
  CaretRight,
  IdentificationCard,
  NewspaperClipping,
  Oven,
  Wall,
} from "@phosphor-icons/react";

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
          <h3>{user.nome}</h3>
          <p>{user.email}</p>
          <Link>
            <button className="button-perfil">Editar Perfil</button>
          </Link>
        </div>
      </div>

      {user.role === 1 ? (
        <div>
          <Link to={"/motorista/documentos-view"}>
            <div className="opcao-perfil">
              <div className="inicio">
                <IdentificationCard size={40} color="#003B6D" weight="fill" />
                <p>Documentos</p>
              </div>
              <CaretRight size={23} weight="bold" />
            </div>
          </Link>

          <Link to={"/motorista/anuncio-edit"}>
            <div className="opcao-perfil">
              <div className="inicio">
                <NewspaperClipping size={40} color="#003B6D" weight="bold" />
                <p>Anuncio</p>
              </div>
              <CaretRight size={23} weight="bold" />
            </div>
          </Link>

          <Link to={"/documentos-view"}>
            <div className="opcao-perfil">
              <div className="inicio">
                <Wall size={40} color="#003B6D" weight="bold" />
                <p>Relatórios</p>
              </div>
              <CaretRight size={23} weight="bold" />
            </div>
          </Link>
        </div>
      ) : (
        ""
      )}

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
