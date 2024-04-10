import carro2 from "../../assets/carro2.svg";
import carro from "../../assets/carros.svg";
import van2 from "../../assets/VansImg/vannova.png";
import vaninterna from "../../assets/VansImg/vaninterna.jpg";
import vanmotor from "../../assets/VansImg/vanmotorista.jpg";

const images = [carro, carro2, carro];

const images2 = [van2, vaninterna, vanmotor];

const infoCards = [
  {
    id: 1,
    img: images2,
    title: "Van1",
    local: ["Santo André", " São Caetano do Sul"],
    preco: "448,00",
    stars: "4,95",
  },
  {
    id: 2,
    img: images,
    title: "Van2",
    local: ["São Bernardo do Campo "],
    preco: "336,00",
    stars: "2,80",
  },
  {
    id: 3,
    img: images,
    title: "Van1",
    local: ["Santo André", "São Caetano do Sul"],
    preco: "448,00",
    stars: "4,95",
  },
  {
    id: 4,
    img: images,
    title: "Van1",
    local: ["Santo André", "São Caetano do Sul"],
    preco: "448,00",
    stars: "3,50",
  },
  {
    id: 5,
    img: images,
    title: "Van1",
    local: ["Santo André", "São Caetano do Sul"],
    preco: "448,00",
    stars: "4,95",
  },
  {
    id: 6,
    img: images,
    title: "Van1",
    local: ["Santo André", "São Caetano do Sul"],
    preco: "448,00",
    stars: "4,95",
  },
];

export default infoCards;
