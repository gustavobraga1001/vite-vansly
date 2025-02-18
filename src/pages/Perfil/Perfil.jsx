import React, { useEffect } from "react";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import returnImg from "../../assets/Return.svg";
import imgPerfil from "../../assets/icons/perfilAcionado.svg";
import Footer from "../../components/Footer";
import OpcoesPerfil from "../../components/OpcoesPerfil/OpcoesPerfil";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";


import "./Perfil.css";
import { FooterDriver } from "../../components/FooterDriver";
import useAuth from "../../contexts/AuthProvider/useAuth";

const Perfil = () => {
  const auth = useAuth();

  // Dentro do componente
  // Quando o usuário muda, invalidar a query "user"

  const { data, isLoading } = useQuery(["user"], () => auth.getUser(), {
    staleTime: 10000,
  });  

  // queryClient.invalidateQueries(["user"]);

  const user = data?.user;

  if (isLoading || !user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container-perfil">
      <HeaderFixo tela={"home"} img={returnImg} text={"Perfil"} />
      <div className="box-perfil">
        <div className="foto-perfil">
          <img
            src={imgPerfil}
            alt="Imagem de perfil"
          />
        </div>
        <div className="info">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <Link to={"/editar-perfil"}>
            <button className="button-perfil">Editar Perfil</button>
          </Link>
        </div>
      </div>

      <OpcoesPerfil user={user} />

      {user.cnh ? (
        <FooterDriver perfil />
      ) : (
        <Footer home={false} presenca={false} percurso={false} perfil={true} />
      )}
    </div>
  );
};

export default Perfil;
