import star from "../../assets/star.svg";
import "./card.css";
import Carrossel from "../Carrossel/Carrossel";
import { Link } from "react-router-dom";

const Card = ({ id, images, title, local, preco, stars }) => {
  return (
    <Link to={`/anuncio/${id}`}>
      <div className="card" key={id}>
        <Carrossel images={images} />
        <div className="container-card">
          <p>{title}</p>
          <div className="card-info">
            <div className="local-card">
            <p >{local}</p>
              {/* {local.map((loc, i) => (
                <p key={i}>{loc}</p>
              ))} */}
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
