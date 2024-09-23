import { Link } from "react-router-dom";
import { FooterDriver } from "../../../components/FooterDriver";

import "./styles.css";
import { CaretDown, CaretRight, MoneyWavy } from "@phosphor-icons/react";
import Donut from "../../../components/Pizza";

export function Estatisticas() {
  return (
    <div>
      <main className="main-estatisticas">
        <h1>Estatísticas</h1>
        <section>
          <div className="filtro-estatiticas">
            <h2>Faturamento</h2>
            <div className="box-filtro">
              Filtrar
              <CaretDown size={18} />
            </div>
          </div>
          <Donut />
        </section>

        <section className="section-pagamentos">
          <div className="filtro-estatiticas">
            <h2>Pagamentos</h2>
            <div className="box-filtro">
              Filtrar
              <CaretDown size={18} />
            </div>
          </div>

          <div className="container-pagamentos">
            <div className="display-pagamentos">
              <p>Pagamentos Concluídos</p>
              <p>Total: 26</p>
            </div>
            <div className="item-pagamento">
              <MoneyWavy size={25} color="rgba(52, 168, 83, 1)" />
              <p>Ana Clara Souza</p>
              <p>R$ 448,00</p>
              <p>05/09/2024</p>
            </div>
            <div className="item-pagamento">
              <MoneyWavy size={25} color="rgba(52, 168, 83, 1)" />
              <p>Ana Clara Souza</p>
              <p>R$ 448,00</p>
              <p>05/09/2024</p>
            </div>
          </div>

          <div className="container-pagamentos">
            <div className="display-pagamentos">
              <p>Pagamentos Pendentes</p>
              <p>Total: 10</p>
            </div>
            <div className="item-pagamento">
              <MoneyWavy size={25} color="rgba(247, 158, 27, 1)" />
              <p>Ana Clara Souza</p>
              <p>R$ 448,00</p>
              <p>05/09/2024</p>
            </div>
            <div className="item-pagamento">
              <MoneyWavy size={25} color="rgba(247, 158, 27, 1)" />
              <p>Ana Clara Souza</p>
              <p>R$ 448,00</p>
              <p>05/09/2024</p>
            </div>
          </div>
        </section>

        <div className="vermais-box">
          <Link>Ver mais</Link>
          <CaretRight size={20} />
        </div>
      </main>

      <FooterDriver estatistica />
    </div>
  );
}
