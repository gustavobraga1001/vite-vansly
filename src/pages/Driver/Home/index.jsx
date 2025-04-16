import { Link } from "react-router-dom";
import { FooterDriver } from "../../../components/FooterDriver";

import "./styles.css"
import { Bell, CaretRight } from "@phosphor-icons/react";
import { useQuery } from "react-query";
import Api from "../../../contexts/AuthProvider/services/api";

export function HomeDriver() {
    const { data: capacity, isLoading } = useQuery(
        ["capacity"],
        () => Api.get("capacity-vehicle"),
        {
          staleTime: 10000,
        }
      );

    const { data: contracts, isLoading: {isLoadingContarcts} } = useQuery(
        ["contracts"],
        () => Api.get("get-contracts-driver/PENDENTE"),
        {
          staleTime: 10000,
        }
      );


    if (!capacity || isLoading || !contracts || isLoadingContarcts) {
        return <p>Carregando</p>
    }

    const contractsPending = contracts.data.contracts

    const metrics = [capacity.data]

    const periods = Object.entries(metrics[0]).map(([period, values]) => ({
        period,
        ...values
      }));

    return (
        <div>
            <header className="header-home-driver">
                <div className="header-home-mensagem">
                    <h1>Olá Motorista</h1>
                    <Bell size={32} weight="fill" />
                </div>
                {/* <div className="btn-documento">
                    <WarningCircle size={32} color="rgba(247, 158, 27, 1)" />
                    <p>Reenvio da CNH pendente | Envio até: 20/09/2024</p>
                    <CaretRight size={20} color="rgba(0, 59, 109, 1)" />
                </div> */}
            </header>

            <main className="main-home-driver">
                <h2>Propostas Recebidas</h2>
                <div className="table-container">
                    <table className="custom-table-home">
                        <thead>
                            <tr>
                                <th>Destino</th>
                                <th>Envio</th>
                                <th>Turno</th>
                                <th></th> {/* Coluna vazia para o ícone */}
                            </tr>
                        </thead>
                        <tbody>
                            {contractsPending.length > 0 ? contractsPending.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.institution}</td>
                                    <td>{new Date(row.created_at).toLocaleDateString('pt-BR')}</td>
                                    <td>{row.period}</td>
                                    <td className="icon-cell">
                                        <Link to={`/motorista/accept-contract/${row.id}`}>
                                            <CaretRight size={20} color="rgba(0, 59, 109, 1)" />
                                        </Link>
                                    </td>
                                </tr>
                            )) : (
                                <p className="zero-propostas">Sem novas propostas</p>
                            )}
                        </tbody>
                    </table>
                </div>
                {contractsPending.length > 5 ? (
                    <Link>Ver todas as propostas</Link>
                ) : (
                    ""
                )}

                <h2>Status de Ocupação</h2>
                <div>
                    <div className="table-container">
                        <table className="custom-table-home">
                            <thead>
                                <tr>
                                    <th>Periodo</th>
                                    <th>Vagas</th>
                                    <th>% Ocupação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {periods.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.period}</td>
                                        <td>{row.remainingCapacity}</td>
                                        <td>{row.occupancyPercentage} %</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <FooterDriver home />
        </div>
    )
}