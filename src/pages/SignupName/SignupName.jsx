import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import voltar from "../../assets/Return.svg";
import { useUserContext } from '../../contexts/UserContext';
import { useState } from 'react';

const SignupName = () => {
    const { name, setName, data, setData } = useUserContext();
    const navigate = useNavigate();

    const handleSignup = () => {
        console.log(name, data)
        navigate("/signup")
    }

  return (
    <div className="container-signup">
      <Link to={"/"}>
        <div className="return-sign">
          <img src={voltar} />
        </div>
      </Link>
      <div className="titulo">
        <h1>Cadastrar</h1>
        <p>
          Insira seu nome e data de nascimento para prosseguirmos com seu cadastro.
        </p>
      </div>
      <div className="content" action="/home">
        <Input
          label={"Digite seu Nome"}
          type="email"
          placeholder="Nome"
          onChange={(e) => [
            // setError(""),
            setName(e.target.value),
          ]}
        />
        <Input
          label={"Digite seu aniversario"}
          type="date"
          placeholder="aniversario"
          onChange={(e) => [
            // setError(""),
            setData(e.target.value),
          ]}
        />
        {/* <p className="label-error">{error}</p> */}
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
  )
}

export default SignupName