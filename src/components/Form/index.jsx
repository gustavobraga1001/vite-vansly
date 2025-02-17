import React, { useState } from "react";
import Input from '../Input/index'
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import './index.css'
import useAuth from "../../contexts/AuthProvider/useAuth";

const Form = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

    async function onFinish() {
      if (!email || !senha) {
        setError("Digite suas credenciais");
        return;
      }

      try {
        await auth.authenticate(email, senha);
      } catch (error) {
        setError(error.message);
      }
      navigate("/home");
    }

  return (
    <div className="conteudo">
            <Input 
                label={'Digite seu E-mail'}
                type="email"
                placeholder="E-mail"
                onChange={(e) => [setEmail(e.target.value), setError("")]}
            />

            <Input 
                label={'Digite seu senha'}
                type="password"
                placeholder="Senha"
                onChange={(e) => [setSenha(e.target.value), setError("")]}
            />
            <div className="opcoes-login">
                <div className="lembrar">
                    <input type="checkbox" id="check-box" className="check" />
                    <label htmlFor="check-box">Lembrar senha</label>
                </div>
                <a href="">Esqueci minha senha</a>
            </div>
            <p>{error}</p>
            <div className="botoes">
              <Link to="/signup" className="link-cadastrar">
                  <p>
                    Cadastrar
                  </p>
              </Link>
              <Button text="Acessar"  classe={'acessar'} onClick={onFinish}/>
            </div>
        </div>
  );
};

export default Form;