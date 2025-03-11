import { useEffect, useState } from "react";
import { FooterDriver } from "../../../components/FooterDriver";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import Api from "../../../contexts/AuthProvider/services/api";

export function PercursoDriver() {

    const [date, setDate] = useState('')
    const [hasRouteActive, setHasRouteActive] = useState(null)
    const [selectedPeriod, setSelectedPeriod] = useState(""); // Criação do estado para controlar o valor selecionado

    useEffect(() => {
        setHasRouteActive(localStorage.getItem('routeActive'))
    }, [])

    console.log(hasRouteActive)

    async function getRoute() {
        try {
          date.setUTCHours(0, 0, 0, 0);
    
          const dateNow = new Date();
          const hours = dateNow.getHours();
    
          let period = '';
    
          if (hours >= 6 && hours < 14) {
            period = 'MANHA';
          } else if (hours >= 14 && hours < 18) {
            period = 'TARDE';
          } else if (hours >= 18 && hours < 24) {
            period = 'NOITE';
          }
    
          const response = await Api.post("get-route", { date, period });
    
          if (!response.data || !response.data.route) {
            return {};  // Retorna um objeto vazio caso não encontre a rota
          }
    
          // Caso contrário, limpa o erro
          return response.data;  
        } catch (error) {
          return {};  // Retorna um objeto vazio em caso de erro
        }
      }

      async function startRoute() {
        if (hasRouteActive === null) {
            try {
                console.log(selectedPeriod) 
                const currentDate = new Date();
                const currentDateString = new Date(currentDate.setHours(0, 0, 0, 0)).toISOString();
                console.log(currentDateString);

                
                // const response = await Api.post("create-route", { date, period });

              } catch (error) {
                return {};  // Retorna um objeto vazio em caso de erro
              }
        }
      }

    return (
        <div>
            <HeaderFixo tela="home" text="Percurso" />
            {hasRouteActive === null ? (
        <>
          <select 
            value={selectedPeriod} // Controlando o valor selecionado
            onChange={(e) => setSelectedPeriod(e.target.value)} // Atualizando o valor do estado
          >
            <option value="MANHA">Manhã</option>
            <option value="TARDE">Tarde</option>
            <option value="NOITE">Noite</option>
          </select>
          <button onClick={startRoute}>Iniciar Rota</button>
        </>
      ) : ''}


            <div className="container-percurso">
                <div className="container-item-percurso">
                    <p>16:43</p>
                    <div className="container-barra"><div className="bola-barra"></div> <span className="traco-barra"></span></div>
                    <div>
                        <p>Rua das figuerias, 150</p>
                        <span>Jardim Bela vista</span>
                    </div>
                </div>

                <div className="container-item-percurso">
                    <p>16:43</p>
                    <div className="container-barra"><div className="bola-barra"></div> <span className="traco-barra"></span></div>
                    <div>
                        <p>Rua das figuerias, 150</p>
                        <span>Jardim Bela vista</span>
                    </div>
                </div>
                <div className="container-item-percurso container-item-off">
                    <p>16:58</p>
                    <div className="container-barra">
                        <div className="bola-barra"></div>
                        <span className="traco-barra"></span>
                    </div>
                    <div>
                        <p>Avenida Portugal, 1010</p>
                        <span>Centro, Santo André - SP, 09040-001</span>
                        <button>Confirmar embarque</button>
                    </div>
                </div>
                <div className="container-item-percurso container-item-off item-final">
                    <p>16:58</p>
                    <div className="container-barra">
                        <div className="bola-barra"></div>
                        <span className="traco-barra"></span>
                    </div>
                    <div>
                        <p>Universidade Municipal de São Caetano do Sul - Campus Conceição</p>
                        <span>R. Conceição, 321 - Santo Antônio, São Caetano do Sul - SP, 09530-060</span>
                    </div>
                </div>

            </div>

            <FooterDriver percurso />
        </div >
    )
}