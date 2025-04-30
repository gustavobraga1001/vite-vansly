import  { useState } from "react";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import Input from "../../components/Input";
import voltar from "../../assets/Return.svg";
import useAuth from "../../contexts/AuthProvider/useAuth";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onFinish() {
    if (!name || !email || !password) {
      setError("Digite suas credenciais");
      return;
    }
  
    try {
      const response = await auth.register(name, email, password);
      console.log(response);
  
      // Se deu tudo certo, limpa o erro e navega
      setError("");
      navigate("/login");
    } catch (error) {
      // Aqui o error.message terá a mensagem do throw
      setError(error.message)
    }
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
        <p>Insira seu email para prosseguirmos com seu cadastro.</p>
      </div>
      <div className="content">
        <Input
          label={"Digite seu Nome"}
          type="text"
          placeholder="Nome"
          onChange={(e) => [setName(e.target.value), setError("")]}
        />
        <Input
          label={"Digite seu E-mail"}
          type="email"
          placeholder="E-mail"
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          label={"Digite seu senha"}
          type="password"
          placeholder="Senha"
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />
        <p className="label-error">{error}</p>
        <div className="button">
          <Button
            text="Inscrever-se"
            type="submit "
            classe={"acessar"}
            onClick={onFinish}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
