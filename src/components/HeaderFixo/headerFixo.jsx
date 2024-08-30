import "./headerFixo.css";
import { Link } from "react-router-dom";
import returnImg from "../../assets/Return.svg";

const HeaderFixo = ({ tela, img = returnImg, text, backColor, textColor }) => {
  return (
    <header className="header-fixo" style={{ backgroundColor: backColor }}>
      <Link to={`/${tela}`}>
        <img src={img} alt="" />
      </Link>
      <p style={{ color: textColor }}>{text}</p>
    </header>
  );
};

export default HeaderFixo;
