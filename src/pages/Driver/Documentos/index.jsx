import { ArrowLeft } from "@phosphor-icons/react";

import "./styles.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Documentos() {

    const [image, setImage] = useState(null);

    const navigate = useNavigate()

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
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
            </div>
            <form className="documentos-box" onSubmit={handleSubmitDoc}>
                <h2>Envio de documentos</h2>
                <p>Para prosseguir com o seu cadastro de motorista é necessário realizar o envio da sua Carteira Nacional de Habilitação (CNH).</p>
                <p>Para isso basta enviar uma foto do documento conforme a imagem de exemplo. Garanta que todos os campos estejam visíveis.</p>

                <h3>Selecionar foto</h3>
                <input type="file" accept="image/*" onChange={handleImageUpload} required={true} />
                <button className="button-azul">Prosseguir</button>
            </form>
        </div>
    )
}