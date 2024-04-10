import React from "react";

function Stars({ count, img}) {
  // Cria um array com o número de estrelas baseado no count
  const stars = Array.from({ length: count }, (_, index) => index + 1);

  return (
    <div className="avaliacao">
      {stars.map((_, index) => (
        <img key={index} src={img} />
      ))}
    </div>
  );
}

export default Stars;
