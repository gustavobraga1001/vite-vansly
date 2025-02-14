import sino from "../../assets/sino.svg";
import pesquisa from "../../assets/pesquisa.svg";
import Pesquisa from "../Pesquisa/pesquisa";
import { Link } from "react-router-dom";
import "./header.css";
import useAuth from "../../contexts/AuthProvider/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="titulo-home">
        <h1>Olá, Seja Bem vindo</h1>
        <Link to="/notificacoes">
          <img src={sino} />
        </Link>
      </div>
      <Pesquisa
        img={pesquisa}
        placeholder={"Para onde?"}
        type={"text"}
        color={"white"}
      />
    </header>
  )
};

export default Header;
