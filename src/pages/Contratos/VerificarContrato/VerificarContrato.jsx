import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import returnImgWhite from "../../../assets/icons/return-white.svg"

export function VerificarContrato() {
    const { id } = useParams()

    const [contrato, setContrato] = useState([]);

    useEffect(() => {
        const storedContracts = JSON.parse(localStorage.getItem("contratos"));
        if (storedContracts) {
            setContrato(storedContracts.filter(contrato => contrato.id === id));
        }

    }, []);

    return (
        <div>
            <HeaderFixo
                backColor={"#003B6D"}
                text={"Informações do Contrato"}
                tela={"contratos"}
                textColor={"white"}
                img={returnImgWhite}
            />
            {contrato.length > 0 ? (
                <div key={contrato[0].id}>
                    <div>
                        <div className="card-info-contrato">
                            <p>
                                <span>{contrato[0].motorista.title}</span>
                            </p>
                            <p>
                                <span>Motorista - </span>
                                {contrato[0].motorista.nome}
                            </p>
                            <p>
                                <span>Rota - </span>Santo André - São Caetano do Sul
                            </p>
                            <p>
                                <span>Horário de início - </span>
                                {contrato[0].motorista.horarios.manha.horario}
                            </p>
                        </div>

                        <div className="divisoria-comp"></div>

                        <div className="card-info-contrato">
                            <p>
                                <span>Embarque - </span>
                                {contrato[0].ida}
                            </p>
                            <p>
                                <span>Destino - </span>
                                {contrato[0].destino}
                            </p>
                            {contrato[0].desembarque ? (
                                <p>
                                    <span>Desembarque - </span>
                                    {contrato[0].desembarque}
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
                                    <p>R$ {contrato[0].precoFinal} /Mês</p>
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