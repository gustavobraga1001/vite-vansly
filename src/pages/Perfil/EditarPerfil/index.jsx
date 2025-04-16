import { useState, useEffect } from "react";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import "./styles.css";
import useAuth from "../../../contexts/AuthProvider/useAuth";
import { useQuery } from "react-query";
import Loading from "../../../components/Loading";
import Api from "../../../contexts/AuthProvider/services/api";
import { useNavigate } from "react-router-dom";
import { UploadSimple } from "@phosphor-icons/react";

export function EditarPerfil() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [urlPhoto, setUrlPhoto] = useState("");
    const [photo, setPhoto] = useState("");

    const navigate = useNavigate()

    const auth = useAuth();
    
    const { data, isLoading } = useQuery(["user"], () => auth.getUser());  

    const user = data?.user;

    // Atualiza os estados quando os dados do usuário estiverem carregados
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setUrlPhoto(user.urlPhoto || "");
        }
    }, [user]);

    if (isLoading) {
        return <Loading />;
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();       

        const ASSETS_CLOUDIFARY = import.meta.env.VITE_ASSETS_CLOUD;

        if (photo) {

            const formData = new FormData();
            formData.append("file", photo);
            formData.append("upload_preset", "unsigned_preset"); // Nome do preset que você criou
        
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${ASSETS_CLOUDIFARY}/image/upload`,
              {
                method: "POST",
                body: formData,
              }
            );
            const data = await response.json();
            try {
                const response = await Api.patch("edit-profile", {name, email, urlPhoto: data.secure_url});
                console.log(response);
            
                // Se deu tudo certo, limpa o erro e navega
                navigate("/perfil");
            } catch (error) {
            // Aqui o error.message terá a mensagem do throw
            }
            console.log("Enviando dados atualizados:", { name, email, urlPhoto });
        } else {
            try {
                    const response = await Api.patch("edit-profile", {name, email, urlPhoto});
                    console.log(response);
                
                    // Se deu tudo certo, limpa o erro e navega
                    navigate("/perfil");
                } catch (error) {
                // Aqui o error.message terá a mensagem do throw
                }
                console.log("Enviando dados atualizados:", { name, email, urlPhoto });
            }
        }

    return (
        <div className="container-editar-perfil">
            <HeaderFixo text={"Editar perfil"} tela={"perfil"} />

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        id="nome"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="button-foto-perfil" onClick={() => document.getElementById("imageInput").click()}>
                    <p>Alterar foto de perfil</p>
                    <UploadSimple size={25} />
                        <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }} // Esconde o input de arquivo
                        />
                    </div>

                <input type="submit" value="Salvar Alterações" className="salvar-editar-perfil" />
            </form>
        </div>
    );
}
