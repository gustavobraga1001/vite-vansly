import { ArrowLeft } from "@phosphor-icons/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth"
import "./styles.css";

export function Documentos() {
    const [fileCnh, setFileCnh] = useState(null);
    const [fileCrlv, setFileCrlv] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleImageUpload = (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleSubmitDoc = (event) => {
        event.preventDefault();

        const docsDb = JSON.parse(localStorage.getItem('docs_bd')) || {};

        if (fileCnh || fileCrlv) {
            const newEntry = { cnhImage: null, crlvImage: null };

            if (fileCnh) {
                const readerCnh = new FileReader();
                readerCnh.onload = () => {
                    newEntry.cnhImage = readerCnh.result;
                    docsDb[user.id] = { ...docsDb[user.id], ...newEntry };
                    localStorage.setItem('docs_bd', JSON.stringify(docsDb));
                };
                readerCnh.readAsDataURL(fileCnh);
            }

            if (fileCrlv) {
                const readerCrlv = new FileReader();
                readerCrlv.onload = () => {
                    newEntry.crlvImage = readerCrlv.result;
                    docsDb[user.id] = { ...docsDb[user.id], ...newEntry };
                    localStorage.setItem('docs_bd', JSON.stringify(docsDb));
                };
                readerCrlv.readAsDataURL(fileCrlv);
            }
        }

        // Navegue para a próxima página ou execute outras ações
        navigate("/motorista/veiculo");
    };

    return (
        <div className="documentos-container">
            <header>
                <Link to="/motorista">
                    <ArrowLeft size={45} color="#003B6D" />
                </Link>
            </header>
            <div className="img-doc-exaple">
                <img src="https://i.imgur.com/hxGnZYa.jpg" alt="Imagem do Imgur" />
                <img src="https://imgur.com/1WvXlG7.jpg" alt="Imagem do Imgur" />
            </div>
            <form className="documentos-box" onSubmit={handleSubmitDoc}>
                <h2>Envio de documentos</h2>
                <p>Para prosseguir com o seu cadastro de motorista é necessário realizar o envio da sua Carteira Nacional de Habilitação (CNH) e do Certificado de registro e licenciamento de veículo (CRLV)</p>
                <p>Para isso basta enviar uma foto do documento conforme a imagem de exemplo. Garanta que todos os campos estejam visíveis.</p>

                <h3>Selecionar foto da CNH</h3>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setFileCnh)}
                />

                <h3>Selecionar foto da CRLV</h3>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setFileCrlv)}
                />

                <button className="button-azul" type="submit">
                    Prosseguir
                </button>
            </form>
        </div>
    );
}
