import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import returnImgWhite from "../../../assets/icons/return-white.svg"
import Api from "../../../contexts/AuthProvider/services/api";
import { useQuery } from "react-query";
import Loading from "../../../components/Loading";

export function VerificarContrato() {
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
        <div>
            <HeaderFixo
                backColor={"#003B6D"}
                text={"Informações do Contrato"}
                tela={"contratos"}
                textColor={"white"}
                img={returnImgWhite}
            />
            {contract ? (
                <div key={contract.id}>
                    <div>
                        <div className="card-info-contrato">
                            <p>
                                <span>{data.title}</span>
                            </p>
                            <p>
                                <span>Motorista - </span>
                                {data.nameDriver}
                            </p>
                            <p>
                                <span>Horário de início - </span>
                                {contract.period}
                            </p>
                        </div>

                        <div className="divisoria-comp"></div>

                        <div className="card-info-contrato">
                            <p>
                                <span>Embarque - </span>
                                {contract.boarding}
                            </p>
                            <p>
                                <span>Destino - </span>
                                {contract.institution}
                            </p>
                            {contract.landing ? (
                                <p>
                                    <span>Desembarque - </span>
                                    {contract.landing}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="divisoria-comp"></div>

                        <div className="card-info-final">
                            <h1>Preço final do contrato</h1>
                            <div className="card-info-contrato">
                                <div className="card-info-box">
                                    <p>Total do serviço</p>
                                    <div className="card-info-borda-menor"></div>
                                    <p>R$ {contract.monthlyAmount} /Mês</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Não há contratos</h1>
            )
            }
        </div>
    )
}