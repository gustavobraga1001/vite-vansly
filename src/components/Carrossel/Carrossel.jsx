import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carrossel.css'; // Arquivo de estilos

const Carousel = ({ image, repeatTimes = 5 }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Desabilitar os botões laterais de navegação
    dotsClass: 'slick-dots-custom', // Classe personalizada para os dots
    appendDots: dots => (
      <ul> {dots} </ul>
    )
  };

  // Criando as imagens com base na quantidade de repetições
  const images = [];
  for (let i = 0; i < repeatTimes; i++) {
    images.push(
      <div key={i}>
        <img src={image} alt={`Image ${i}`} />
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images}
      </Slider>
    </div>
  );
};

export default Carousel;
