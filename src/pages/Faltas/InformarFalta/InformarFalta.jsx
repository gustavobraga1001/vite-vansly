import { useState } from "react";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";

import "./InformarFalta.css";

export function InfomarFalta() {
  const [ativado, setAtivado] = useState(false);
  const [dataAusencia, setDataAusencia] = useState("");

  const handleClick = () => {
    setAtivado(!ativado);
  };

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  function handleNewFalta(e) {
    e.preventDefault();
    if (dataAusencia === "") {
      return;
    }

    const prevAusencias = JSON.parse(localStorage.getItem("ausencias"));
    const dateFomatted = formatDate(dataAusencia);

    if (prevAusencias) {
      localStorage.setItem(
        "ausencias",
        JSON.stringify([...prevAusencias, dateFomatted])
      );
    } else {
      localStorage.setItem("ausencias", JSON.stringify([dataAusencia]));
    }

    setDataAusencia("");
  }

  return (
    <div>
      <HeaderFixo text={"Informar ausência"} tela="faltas" />
      <main className="main-informar-falta">
        {/* <div className="box-ausensia">
          <span>Ausência recorrente</span>
          <div
            className={`toggle-container ${ativado ? "ativo" : ""}`}
            onClick={handleClick}
          >
            <div className="toggle-ball"></div>
          </div>
        </div> */}

        <form onSubmit={handleNewFalta}>
          <label>Data da ausência</label>
          <input
            type="date"
            onChange={(e) => setDataAusencia(e.target.value)}
            placeholder="00/00/0000"
            value={dataAusencia}
          />
          <button>Confirmar</button>
        </form>
      </main>
    </div>
  );
}
