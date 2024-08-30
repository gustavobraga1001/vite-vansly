import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import voltar from "../../assets/Return.svg";

const SignupName = () => {

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="container-signup-name">
      <Link to={"/"}>
        <div className="return-sign">
          <img src={voltar} />
        </div>
      </Link>
      <div className="titulo">
        <h1>Cadastrar</h1>
        <p>
          Insira seu nome e data de nascimento para prosseguirmos com seu
          cadastro.
        </p>
      </div>
      <div className="content" action="/home">
        <Input
          label={"Digite seu Nome"}
          type="email"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label={"Digite seu aniversario"}
          type="date"
          placeholder="aniversario"
          onChange={(e) => setData(e.target.value)}
        />
        <div className="button">
          <Button
            text="Inscrever-se"
            type="submit "
            classe={"acessar"}
            onClick={handleSignup}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupName;
