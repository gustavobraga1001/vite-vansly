import React, { useEffect, useState } from "react";
import returnImg from "../../assets/Return.svg";
import telaContrato from "../../assets/contrato.svg";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import divisoria from "../../assets/Divisoria.svg";

const Contratos = () => {
  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    const storedContracts = JSON.parse(localStorage.getItem("contratos"));
    if (storedContracts) {
      setContratos(storedContracts);
    }
  }, []);

  return (
    <div className="notificacao-container">
      <HeaderFixo tela={"perfil"} img={returnImg} text={"Contratos"} />

      {!contratos ? (
        <div className="notificacao-box">
          <img src={telaContrato} alt="" />
          <p>Você ainda não firmou nenhum contrato</p>
        </div>
      ) : (
        contratos.map((contract) => {
          return (
            <div key={contract.motorista.title}>
              <div>
                <div className="card-info-contrato">
                  <p>
                    <span>{contract.motorista.title}</span>
                  </p>
                  <p>
                    <span>Motorista - </span>
                    {contract.motorista.motorista}
                  </p>
                  <p>
                    <span>Rota - </span>Santo André - São Caetano do Sul
                  </p>
                  <p>
                    <span>Horário de início - </span>
                    {contract.motorista.horarios.manha.horario}
                  </p>
                </div>
                <div className="divisoria-anuncio">
                  <img src={divisoria} alt="" />
                </div>
                <div className="card-info-contrato">
                  <p>
                    <span>Embarque - </span>
                    {contract.ida}
                  </p>
                  <p>
                    <span>Destino - </span>
                    {contract.destino}
                  </p>
                  {contract.desembarque ? (
                    <p>
                      <span>Desembarque - </span>
                      {contract.desembarque}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="divisoria-anuncio">
                  <img src={divisoria} alt="" />
                </div>
                <div className="card-info-final">
                  <h1>Preço final do contrato</h1>
                  <div className="card-info-contrato">
                    <div className="card-info-box">
                      <p>Preço do serviço</p>
                      <div className="card-info-borda"></div>
                      <p>R$ {contract.motorista.preco}</p>
                    </div>
                    <div className="card-info-box">
                      <p>Impostos / Taxas</p>
                      <div className="card-info-borda"></div>
                      <p>R$ {contract.formattedPriceTaxa}</p>
                    </div>
                    <div className="card-info-box">
                      <p>Total do serviço</p>
                      <div className="card-info-borda-menor"></div>
                      <p>R$ {contract.formattedPrice} /Mês</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Contratos;
