import { useQuery } from "react-query";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import "./styles.css"
import Api from "../../../contexts/AuthProvider/services/api";
import { useNavigate, useParams } from "react-router-dom";
import urlPhotoDefault from "../../../assets/icons/perfilAcionado.svg"


export function AcceptContract() {

    const { contractId } = useParams()

    const navigate = useNavigate()

    const { data: contractResponse, isLoading: {isLoadingContarct} } = useQuery(
        ["contract"],
        () => Api.get(`get-contract/${contractId}`),
        {
          enabled: !!contractId, // Só executa a requisição se o contractId existir
        }
      );

    if (!contractResponse || isLoadingContarct) {
        return <p>Carregando...</p>
    }

    const contract = contractResponse.data

    async function handleStatusContract(status) {
        try {
            await Api.patch("contract-stage", {contractId, status})
            navigate("/home")
        } catch (error) {
            console.error("Error:", error)
        }
    }
 
    return (
        <div>
           <HeaderFixo text={"Avaliar Contrato"} tela={'home'}/>
           <main className="main-accept-contract">

           <div className="info-student-contract">
                <img src={contract.user.urlPhoto ?? urlPhotoDefault} alt="" />
                <p>{contract.user.name}</p>
           </div>
           <div className="input-info-contract">
                <label htmlFor="institution">Ponto de Destino</label>
                <input type="text" value={contract.institution} name="institution" readOnly/>
           </div>
           <div className="input-info-contract">
                <label htmlFor="">Apenas Ida</label>
                <input type="text" value={contract.landing ? "Não" : "Sim"} name="" readOnly/>
           </div>
           <div className="input-info-contract">
                <label htmlFor="boarding">Local de embarque (ida)</label>
                <input type="text" value={contract.boarding} name="boarding" readOnly/>
           </div>
           {contract.landing !== null ? (
            <div className="input-info-contract">
                <label htmlFor="landing">Local de desembarque (volta)</label>
                <input type="text" value={contract.landing} name="landing" readOnly/>
            </div>
                ) : (
                    ""
                )}
           <div className="input-info-contract">
                <label htmlFor="period">Turno</label>
                <input type="text" value={contract.period} name="period" readOnly/>
           </div>
           </main>
           <footer className="footer-buttons-accept">
                <button className="button-accept" onClick={() => handleStatusContract("ACEITO")}>Aceitar</button>
                <button className="button-decline" onClick={() => handleStatusContract("NEGADO")}>Negar</button>
           </footer>
        </div>
    )
}