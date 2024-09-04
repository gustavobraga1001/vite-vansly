import React, { useEffect, useState } from "react";
import returnImg from "../../assets/Return.svg";
import telaContrato from "../../assets/contrato.svg";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import divisoria from "../../assets/Divisoria.svg";

import "./Contratos.css"
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Contratos = () => {
  const [contratos, setContratos] = useState([]);

  const { user } = useAuth()

  useEffect(() => {
    const storedContracts = JSON.parse(localStorage.getItem("contratos"));
    if (storedContracts) {
      setContratos(storedContracts.filter(item => item.userId === user.id));
    }
  }, []);

  console.log(contratos)

  return (
    <div className="notificacao-container">
      <HeaderFixo tela={"perfil"} img={returnImg} text={"Contratos"} />

      {contratos.length <= 0 ? (
        <div className="notificacao-box">
          <img src={telaContrato} />
          <p>Você ainda não firmou nenhum contrato</p>
        </div>
      ) : (
        contratos.map((contract) => {
          return (
            <Link to={contract.id} className="link-to" key={contract.id}>
              <div className="box-list-contrato">
                <div>
                  <span>{contract.motorista.title}</span>
                </div>
                <div>
                  <span>Motorista </span><p>- {contract.motorista.nome}</p>
                </div>
                <div>
                  <span>Horário de início </span><p>- {contract.motorista.horarios.manha.horario}</p>
                </div>
                <div>
                  <span>Embarque </span><p>- {contract.ida}</p>
                </div>
                <div>
                  <span>Desembarque </span><p>- {contract.destino}</p>
                </div>
              </div>
            </Link>
          )
        })
      )}
    </div>
  );
};

export default Contratos;
