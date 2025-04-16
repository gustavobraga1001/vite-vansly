import { useState } from "react";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";

import "./InformarFalta.css";
import { useQuery } from "react-query";
import useAuth from "../../../contexts/AuthProvider/useAuth";
import Api from "../../../contexts/AuthProvider/services/api";
import { useNavigate } from "react-router-dom";

export function InfomarFalta() {

  const [dataAusencia, setDataAusencia] = useState("");

  const navigate = useNavigate()

  const auth = useAuth();

  const { data, isLoading } = useQuery(["user"], () => auth.getUser(), {
      staleTime: 10000,
    });  
  
  const user = data?.user;

  if (isLoading || !user) {
    return <p>Carregando...</p>;
  }


  function formatDate(inputDate) {
    const date = new Date(inputDate); // Cria um objeto Date a partir da string 'yyyy-mm-dd'
    return date.toISOString(); // Converte para o formato 'yyyy-mm-ddTHH:mm:ss.sssZ'
  }

  async function handleNewFalta(e) {
    e.preventDefault();  // Impede o comportamento padrão do formulário de recarregar a página

    const userId = user.id 
    const dateOfAbsence = formatDate(dataAusencia)

    console.log(dateOfAbsence)

      if (dataAusencia !== "" ) {
        const request = await Api.post("/absence", { dateOfAbsence , userId });
        navigate('/faltas')
        return request.data;
      }
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
          {/* {
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
          } */}
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
