import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import "./styles.css"

export function Veiculo() {
    return (
        <div className="veiculo-container">
            <header>
                <Link to="/motorista/documentos">
                    <ArrowLeft size={45} color="#003B6D" />
                </Link>
            </header>

            <div className="img-doc-exaple">
                <img src="https://imgur.com/3LiP98N.jpg" alt="Imagem do Imgur" />
            </div>

            <div className="box-veiculos">
                <h2>Cadastramento de veículo</h2>

                <p>Agora você precisa vincular o veículo que vai ser utilizado para realização do transporte. Para isso você precisará informar alguns dados e realizar o envio do documento do veículo. </p>

                <Link className="a-azul" to={"/motorista/veiculo-infos"}>Prosseguir</Link>
            </div>
        </div>
    )
}