import { Link } from "react-router-dom";
import { FooterDriver } from "../../../components/FooterDriver";

import "./styles.css";
import { CaretRight, MoneyWavy } from "@phosphor-icons/react";
import Donut from "../../../components/Pizza";
import { useQuery } from "react-query";
import Api from "../../../contexts/AuthProvider/services/api";
import { useState } from "react";

export function Estatisticas() {
  // Lista de meses
  const months = [
    "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", 
    "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
  ];

  // Obtém o mês atual
  const currentMonth = months[new Date().getMonth()];

  // Define o estado inicial como o mês atual
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Função para alterar o mês selecionado
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Consulta para obter dados de faturamento
  const { data: faturamento, isLoadingF } = useQuery(
    ["statistics"],
    () => Api.get("get-statistics"),
    {
      staleTime: 10000,
    }
  );

  // Consulta para obter contratos com base no mês selecionado
  const { data: contratos, isLoading: isLoadingC } = useQuery(
    ["payments", selectedMonth], // Dependência para refazer a query quando o mês mudar
    () => Api.get(`get-payments/${selectedMonth}`)
  );

  // Exibe uma mensagem de carregamento enquanto as consultas estão sendo feitas
  if (isLoadingF || isLoadingC || !faturamento || !contratos) {
    return <p>Carregando...</p>;
  }``

  // Filtra os contratos em pagamentos concluídos e pendentes
  const pagos = contratos.data.filter((c) => c.payment.length > 0);
  const pendentes = contratos.data.filter((c) => c.payment.length === 0);

  return (
    <div>
      <main className="main-estatisticas">
        <h1>Estatísticas</h1>
        <section>
          <div className="filtro-estatiticas">
            <h2>Faturamento</h2>
            <div className="box-filtro">
              <label htmlFor="month-select">Filtrar por Mês: </label>
              <select
                id="month-select"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Donut data={faturamento.data} />
        </section>

        <section className="section-pagamentos">
          <div className="container-pagamentos">
            <div className="display-pagamentos">
              <p>Pagamentos Concluídos</p>
              <p>Total: {pagos.length}</p>
            </div>
            {pagos.length > 0 ? (
              pagos.map((contract, i) => (
                <Link to={`payment/${contract.user_id}/${selectedMonth}`} className="item-pagamento" key={i}>
                  <MoneyWavy size={25} color="#1ff71b" />
                  <p>{contract.name}</p>
                  <p>
                    R$ {parseFloat(contract.payment[0].value).toFixed(2).replace('.', ',').toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                  <p>{new Date(contract.payment[0].payment_at).toLocaleDateString('pt-BR')}</p>
                </Link>
              ))
            ) : (
              <p>sem registros</p>
            )}
          </div>

          <div className="container-pagamentos">
            <div className="display-pagamentos">
              <p>Pagamentos Pendentes</p>
              <p>Total: {pendentes.length}</p>
            </div>
            {pendentes.length > 0 ? (
              pendentes.map((contract, i) => (
                <Link to={`new-payment/${contract.user_id}/${selectedMonth}`} className="item-pagamento" key={i}>
                      <MoneyWavy size={25} color="#d69507" />
                      <p>{contract.name}</p>
                      <p>
                        R$ {parseFloat(contract.monthlyAmount).toFixed(2).replace('.', ',').toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                      <p>{new Date(contract.venciment).toLocaleDateString('pt-BR')}</p>
                  </Link>
              ))              
            ) : (
              <p>sem registros</p>
            )}
          </div>
        </section>

        <div className="vermais-box">
          {pendentes.length > 6 ? (
            <>
            <Link>Ver mais</Link>
            <CaretRight size={20} />
            </>
          ): ""}
        </div>
      </main>

      <FooterDriver estatistica />
    </div>
  );
}
