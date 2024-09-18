import { Link } from "react-router-dom";
import { FooterDriver } from "../../../components/FooterDriver";

import "./styles.css"
import { Bell, CaretRight, WarningCircle } from "@phosphor-icons/react";

export function HomeDriver() {

    const data = [
        { destino: "USCS - Conceição", envio: "13/09/24", turno: "Noite" },
        { destino: "USCS - Barcelona", envio: "11/09/24", turno: "Tarde" },
        { destino: "USCS - Centro", envio: "07/09/24", turno: "Manhã" },
    ];

    const ocupacao = [
        { periodo: "Manhã", vagas: 10, porcentagem: 50 },
        { periodo: "Manhã", vagas: 10, porcentagem: 50 },
        { periodo: "Manhã", vagas: 10, porcentagem: 50 },

    ]

    return (
        <div>
            <header className="header-home-driver">
                <div className="header-home-mensagem">
                    <h1>Olá Motrista</h1>
                    <Bell size={32} weight="fill" />
                </div>
                <div className="btn-documento">
                    <WarningCircle size={32} color="rgba(247, 158, 27, 1)" />
                    <p>Reenvio da CNH pendente | Envio até: 20/09/2024</p>
                    <CaretRight size={20} color="rgba(0, 59, 109, 1)" />
                </div>
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
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.destino}</td>
                                    <td>{row.envio}</td>
                                    <td>{row.turno}</td>
                                    <td className="icon-cell">
                                        <CaretRight size={20} color="rgba(0, 59, 109, 1)" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link>Ver todas as propostas</Link>

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
                                {ocupacao.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.periodo}</td>
                                        <td>{row.vagas}</td>
                                        <td>{row.porcentagem} %</td>
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