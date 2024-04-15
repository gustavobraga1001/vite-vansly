import React, { useState } from "react";
import "./pesquisa.css";
import HeaderFixo from "../HeaderFixo/headerFixo";
import imgReturn from "../../assets/Return.svg";
import { useNavigate } from "react-router-dom";

const Pesquisa = ({ img, placeholder, type, color }) => {
  const navigate = useNavigate();

  const handleInputClick = () => {
    navigate("/busca");
  };
  return ( 
    <div className="pesquisa" style={{ backgroundColor: color }}>
      <img src={img} alt="" />
      <input type={type} placeholder={placeholder} onClick={handleInputClick} />
    </div>
  );
};

export default Pesquisa;
