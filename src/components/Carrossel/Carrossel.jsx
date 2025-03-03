import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carrossel.css'; // Arquivo de estilos
import CarrosselItem from './CarrosselItem/CarrosselItem';

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Desabilitar os botões laterais de navegação
    dotsClass: 'slick-dots-custom', // Classe personalizada para os dots
    appendDots: dots => <ul> {dots} </ul>,
  };

  console.log(images)

  if (!Array.isArray(images) || images.length === 0) {
    return <div className="carousel-container">Nenhuma imagem disponível</div>;
  }

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <CarrosselItem image={image} key={index}/>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
