import sino from "../../assets/sino.svg";
import pesquisa from "../../assets/pesquisa.svg";
import Pesquisa from "../Pesquisa/pesquisa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./header.css";

const Header = () => {
  const { user } = useAuth();

  return user ? (
    <header className="header">
      <div className="titulo-home">
        <h1>Olá, {user.name}</h1>
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
  ) : (
    <h1>Loading</h1>
  );
};

export default Header;
