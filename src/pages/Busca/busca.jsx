import React, { useLayoutEffect, useRef, useState } from "react";
import voltar from "../../assets/Return.svg";
import "./busca.css";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import mapImg from "../../assets/map-search.svg";
import Footer from "../../components/Footer";
import InputMaps from "../../components/InputMaps/InputMaps";

const Busca = () => {
  return (
    <div className="box-busca">
      <HeaderFixo tela="home" img={voltar} text={"Buscar destinos"} />
      <InputMaps />
      <Footer home={true} presenca={false} percurso={false} perfil={false} />
    </div>
  );
};

export default Busca;
