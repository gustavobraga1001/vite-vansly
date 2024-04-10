import React from "react";
import "./Regras.css"

const Regras = () => {
  return (
    <div className="regras">
      <h5>Regras para o transporte</h5>

      <div className="topicos">
        <ul>
          <li>
            Tempo de espera para o embarque de no máximo 5 minutos após a
            chegada.
          </li>
          <li>Obrigatório o uso de cinto de segurança</li>
          <li>Proibido o consumo de alimentos e bebidas</li>
        </ul>
      </div>
    </div>
  );
};

export default Regras;
