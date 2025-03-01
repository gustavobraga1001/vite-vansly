import { ArrowLeft } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";
import { useState } from "react";
import Api from "../../../contexts/AuthProvider/services/api";
import { useQuery } from "react-query";
import useAuth from "../../../contexts/AuthProvider/useAuth";
import Loading from "../../../components/Loading";


export function Documentos() {
    const navigate = useNavigate();
    const [cnhImage,setCnhImage] = useState('')
    const [crlvImage,setCrlvImage] = useState('')
    const [cpf,setCpf] = useState('')
    const [cnh,setCnh] = useState('')

    const auth = useAuth();

    const { data, isLoading } = useQuery(["user"], () => auth.getUser(), {
        staleTime: 10000,
    });  

    const user = data?.user;

    if (isLoading || !user) {
        return <Loading />;
    }


    const handleSubmitDoc = async (event) => {
        event.preventDefault();

        const newDriver = {
            cpf, 
            cnh, 
            userId: user.id,
            images: [cnhImage,crlvImage],
        }

        console.log(newDriver)
        
        try {
            await Api.post('/drivers',  newDriver);
            
        } catch (error) {
            throw new Error(error.message);
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

                <h3>Digite o seu CPF</h3>

                <input type="text" onChange={(e) => setCpf(e.target.value)}/>
                <h3>Digite sua CNH</h3>

                <input type="text" onChange={(e) => setCnh(e.target.value)}/>
                <h3>Coloque o link da foto da CNH</h3>

                <input type="text" onChange={(e) => setCnhImage(e.target.value)}/>

                <h3>Coloque a link da foto do CRLV</h3>
                <input
                    type="text"
                    onChange={(e) => setCrlvImage(e.target.value)}
                />

                <button className="button-azul" type="submit">
                    Prosseguir
                </button>
            </form>
        </div>
    );
}
