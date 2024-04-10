import star from "../../assets/star.svg";
import "./card.css";
import Carrossel from "../Carrossel/Carrossel";
import { Link } from "react-router-dom";

const Card = ({ key, id, img, title, local, preco, stars }) => {
  console.log(local);
  return (
    <Link to={`/anuncio/${id}`}>
      <div className="card" key={key}>
        <Carrossel images={img} />
        <div className="container-card">
          <p>{title}</p>
          <div className="card-info">
            <div className="local-card">
            {local.map((loc, i) => (
              <p key={i}>{loc}</p>
            ))}
            </div>
            <div className="card-star">
              <img src={star} alt="" />
              <p>{stars}</p>
            </div>
          </div>
          <p>R$ {preco} /Mês</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
