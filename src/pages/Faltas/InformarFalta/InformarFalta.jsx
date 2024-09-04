import { useState } from "react";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import useAuth from "../../../hooks/useAuth";


import "./InformarFalta.css";

export function InfomarFalta() {
  const { user } = useAuth()

  const [ativado, setAtivado] = useState(false);
  const [dataAusencia, setDataAusencia] = useState("");
  const [dataRecorrente, setDataRecorrente] = useState([]);

  const [daysWeek, setDaysWeek] = useState(
    [
      { day: "Domingo", enable: false },
      { day: "Segunda", enable: false },
      { day: "Terça", enable: false },
      { day: "Quarta", enable: false },
      { day: "Quinta", enable: false },
      { day: "Sexta", enable: false },
      { day: "Sábado", enable: false },
    ])

  const handleClick = (i) => {
    setAtivado(!ativado);
  };

  const handleClickDay = (index) => {
    setDaysWeek((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, enable: !item.enable } : item
      )
    );
    // Save the clicked day
    const clickedDay = daysWeek[index].day;
    setDataRecorrente((prevDate) => {
      if (prevDate.includes(clickedDay)) {
        // If the day is already in the array, remove it
        return prevDate.filter((day) => day !== clickedDay);
      } else {
        // If the day is not in the array, add it
        return [...prevDate, clickedDay];
      }
    });

    // Log the clicked day
  };

  console.log(dataRecorrente);
  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  function handleNewFalta(e) {
    e.preventDefault();
    if (dataAusencia != "" || dataRecorrente.length > 0) {
      if (dataAusencia != "") {

        const prevAusencias = JSON.parse(localStorage.getItem("ausencias"));
        const dateFomatted = formatDate(dataAusencia);

        if (prevAusencias) {
          localStorage.setItem(
            "ausencias",
            JSON.stringify([...prevAusencias, { userId: user.id, data: dateFomatted }])
          );
        } else {
          localStorage.setItem("ausencias", JSON.stringify([{ userId: user.id, data: dateFomatted }]));
        }

        setDataAusencia("");
      } else {

        const prevAusenciasRecorrentes = JSON.parse(localStorage.getItem("ausencias-recorrentes")) || [];

        console.log(prevAusenciasRecorrentes);

        const existingUserIndex = prevAusenciasRecorrentes.findIndex(item => item.userId === user.id);

        if (existingUserIndex !== -1) {
          // If the user already exists, update their data
          prevAusenciasRecorrentes[existingUserIndex].data = dataRecorrente;
        } else {
          // If the user does not exist, add a new entry
          prevAusenciasRecorrentes.push({ userId: user.id, data: dataRecorrente });
        }

        // Save the updated array back to localStorage
        localStorage.setItem("ausencias-recorrentes", JSON.stringify(prevAusenciasRecorrentes));

        setDataRecorrente([])
        setDaysWeek(daysWeek.map(day => ({ ...day, enable: false })));
      }
    }

    return

  }


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

        <form onSubmit={handleNewFalta}>
          <label>Data da ausência</label>
          {
            ativado ? (
              <div className="options-days">
                {daysWeek.map((item, i) => (
                  <div
                    className={`options-days-item ${item.enable ? "options-days-item-enable" : "options-days-item-disable"} `}
                    key={i}
                    onClick={() => handleClickDay(i)}
                  >
                    {item.day.charAt(0)}
                  </div>
                ))}
              </div>
            ) : (
              <input
                type="date"
                onChange={(e) => setDataAusencia(e.target.value)}
                placeholder="00/00/0000"
                value={dataAusencia}
              />
            )
          }
          <button>Confirmar</button>
        </form>
      </main>
    </div>
  );
}
