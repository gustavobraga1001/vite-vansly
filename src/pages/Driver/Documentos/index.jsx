import { ArrowLeft } from "@phosphor-icons/react";

import "./styles.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Documentos() {

    const [imageCnh, setImageCnh] = useState(null);
    const [imageCrlv, setImageCrlv] = useState(null);

    const navigate = useNavigate()

    const handleImageUploadCnh = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageCnh(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUploadCrlv = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageCrlv(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    function handleSubmitDoc() {
        navigate("/motorista/veiculo")
    }

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
                <p>Para prosseguir com o seu cadastro de motorista é necessário realizar o envio da sua Carteira Nacional de Habilitação (CNH) e  do Certificado de registro e licenciamento de veículo (CRLV)</p>

                <p>Para isso basta enviar uma foto do documento conforme a imagem de exemplo. Garanta que todos os campos estejam visíveis.</p>

                <h3>Selecionar foto da CNH</h3>
                <input type="file" accept="image/*" onChange={handleImageUploadCnh} required={true} />

                <h3>Selecionar foto da CRLV</h3>
                <input type="file" accept="image/*" onChange={handleImageUploadCrlv} required={true} />
                <button className="button-azul">Prosseguir</button>
            </form>
        </div>
    )
}