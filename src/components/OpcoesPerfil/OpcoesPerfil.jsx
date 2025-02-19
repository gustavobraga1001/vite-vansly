import React from "react";
import seta from "../../assets/GoSeta.svg";
import "./OpcoesPerfil.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  CaretRight,
  IdentificationCard,
  NewspaperClipping,
  Oven,
  Wall,
} from "@phosphor-icons/react";

import contratosImg from "../../assets/contratos.svg";
import volanteImg from "../../assets/volante.svg";
import logOutImg from "../../assets/logOut.svg";
import useAuth from "../../contexts/AuthProvider/useAuth";

const OpcoesPerfil = ({user}) => {
  const auth = useAuth();

  const handleSignOut = () => {
    auth.logout()
  };

  console.log(user.cnh)
  return (
    <div>
      {user.cnh ? (
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
        <Link to={"/motorista"}>
          <div className="opcao-perfil">
            <div className="inicio">
              <img src={volanteImg} alt="" />
              <p>Seja um Motorista</p>
            </div>
            <CaretRight size={23} weight="bold" />
          </div>
        </Link>
      )}


      <Link to={"/contratos"}>
        <div className="opcao-perfil">
          <div className="inicio">
            <img src={contratosImg} alt="" />
            <p>Contratos</p>
          </div>
          <CaretRight size={23} weight="bold" />
        </div>
      </Link>
      <div className="opcao-perfil" onClick={handleSignOut}>
        <div className="inicio">
          <img src={logOutImg} alt="" />
          <p>LogOut</p>
        </div>
        <CaretRight size={23} weight="bold" />
      </div>

    </div>
  );
};

export default OpcoesPerfil;
