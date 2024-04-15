import React, { useState } from "react";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./index.css";
import Input from "../../components/Input";
import voltar from "../../assets/Return.svg";
import { useUserContext } from "../../contexts/UserContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { addUser } = useUserContext();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState("14/10/2004");
  const [error, setError] = useState("");

  const handleSignup = () => {
    // setName(email);
    console.log(name);

    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    addUser(email, name, data);
    const res = signup(email, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadatrado com sucesso!");
    navigate("/");
  };

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
          Insira seu numero de telefone para prosseguirmos com seu cadastro.
        </p>
      </div>
      <div className="content" action="/home">
        <Input
          label={"Digite seu E-mail"}
          type="email"
          placeholder="E-mail"
          onChange={(e) => [
            setEmail(e.target.value),
            setError(""),
            setName(e.target.value),
          ]}
        />
        <Input
          label={"Digite seu senha"}
          type="password"
          placeholder="Senha"
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <p className="label-error">{error}</p>
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

export default Signup;
