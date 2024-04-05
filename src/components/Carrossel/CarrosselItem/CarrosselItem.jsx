// CarouselItem.js
import React from 'react';
import '../Carrossel.css';

const CarrosselItem = ({ image }) => {
  return (
    <div className="carousel-item">
      <img src={image} alt="carousel" />
    </div>
  );
};

export default CarrosselItem;
