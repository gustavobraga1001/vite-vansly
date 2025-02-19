import returnImg from "../../assets/Return.svg";
import telaContrato from "../../assets/contrato.svg";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";

import "./Contratos.css"
import { Link } from "react-router-dom";
import Api from "../../contexts/AuthProvider/services/api";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";

const Contratos = () => {

  async function getContract() {
    try {
      const response = await Api.get("/get-contract");

      return response.data;
    } catch (error) {
      console.log(error.response.status);
    }
  }

  const { data, isLoading } = useQuery(["contract"], getContract, {
    staleTime: 20000,
  });
  
  const contract = data?.contract;

  if (isLoading || !contract) {
    return <Loading />;
  }

  console.log(contract)

  return (
    <div className="notificacao-container">
      <HeaderFixo tela={"perfil"} img={returnImg} text={"Contratos"} />

      {!contract ? (
        <div className="notificacao-box">
          <img src={telaContrato} />
          <p>Você ainda não firmou nenhum contrato</p>
        </div>
      ) : (
            <Link to={contract.id} className="link-to" key={contract.id}>
              <div className="box-list-contrato">
                <div>
                  <span>{data.title}</span>
                </div>
                <div>
                  <span>Motorista </span><p>- {data.nameDriver}</p>
                </div>
                <div>
                  <span>Horário de início </span><p>- {contract.period}</p>
                </div>
                <div>
                  <span>Embarque </span><p>- {contract.boarding}</p>
                </div>
                <div>
                  <span>Desembarque </span><p>- {contract.institution}</p>
                </div>
              </div>
            </Link>
          )
        }
    </div>
  );
};

export default Contratos;
