import "./anuncio.css";
import infoCards from "../Home/infoCard";
import { useParams } from "react-router-dom";
import Carousel from "../../components/Carrossel/Carrossel";

const Anuncio = () => {
  const { id } = useParams();
  const card = infoCards.filter((card) => card.id == id);
  const images = card[0].img;
  console.log(images);
  return (
    <div className="box-anuncio">
      <div className="card-anuncio">
        {/* <Carousel images={card[0].img} />
         */}
         <img src={card[0].img[0]} alt="" />
      </div>
    </div>
  );
};

export default Anuncio;
