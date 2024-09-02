import { useState } from "react";
import Footer from "../../../components/Footer";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";

import "./InformarFalta.css";

export function InfomarFalta() {
  const [ativado, setAtivado] = useState(false);

  const handleClick = () => {
    setAtivado(!ativado);
  };

  return (
    <div>
      <HeaderFixo text={"Informar ausência"} tela="faltas" />
      <main className="main-informar-falta">
        <div className="box-ausensia">
          <span>Ausência recorrente</span>
          <div
            className={`toggle-container ${ativado ? "ativo" : ""}`}
            onClick={handleClick}
          >
            <div className="toggle-ball"></div>
          </div>
        </div>

        {!ativado ? (
          <form>
            <label htmlFor="">Data da ausência</label>
            <input type="date" name="" id="" />
          </form>
        ) : (
          ""
        )}

        <div>
          <div>
            <span>Ausencias</span>
            <div>
              icone
              <span>19/09/2024</span>
              img
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
