import returnImg from "../../../assets/Return.svg";
import telaContrato from "../../../assets/contrato.svg";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import Api from "../../../contexts/AuthProvider/services/api";
import { useQuery } from "react-query";
import Loading from "../../../components/Loading";

const ContratosDriver = () => {

  async function getContract() {
    try {
      const response = await Api.get(`/get-contracts-driver/ACEITO`); // Passa o parâmetro diretamente na URL
      return response.data;
    } catch (error) {
      console.log(error.response.status);
    }
  }

  const { data, isLoading } = useQuery(["contracts"], getContract, {
    staleTime: 20000,
  });

  const contracts = data?.contracts;

  if (isLoading && !contracts) {
    return <Loading />;
  }

  return (
    <div className="notificacao-container">
      <HeaderFixo tela={"perfil"} img={returnImg} text={"Contratos Ativos"} />
      {!contracts || contracts.length === 0 ? (
        <div className="notificacao-box">
          <img src={telaContrato} alt="Sem contratos" />
          <p>Você ainda não firmou nenhum contrato</p>
        </div>
      ) : (
        contracts.map((contract) => (
          <>
            <div className="box-list-contrato">
              <div>
                <span>Passgeiro </span>
                <p>- {contract.user.name}</p>
              </div>
              <div>
                <span>Horário de início </span>
                <p>- {contract.period}</p>
              </div>
              <div>
                <span>Embarque </span>
                <p>- {contract.boarding}</p>
              </div>
              <div>
                <span>Desembarque </span>
                <p>- {contract.institution}</p>
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
};

export default ContratosDriver;
