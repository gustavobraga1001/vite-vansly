import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import voltar from "../../assets/Return.svg";
import useAuth from "../../hooks/useAuth";

const SignupName = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState("");

  const handleSignup = () => {
    setUser({
      nome,
      dataNasc,
    });

    navigate("/signup");
  };

  console.log(user);
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
      <div className="content">
        <Input
          label={"Digite seu Nome"}
          type="email"
          placeholder="Nome"
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          label={"Digite seu aniversario"}
          type="date"
          placeholder="aniversario"
          onChange={(e) => setDataNasc(e.target.value)}
        />
        <div className="button">
          <Button
            text="Inscrever-se"
            type="submit"
            classe={"acessar"}
            onClick={handleSignup}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupName;
