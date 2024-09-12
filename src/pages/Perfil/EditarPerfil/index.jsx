import { useEffect, useState } from "react";
import { UploadSimple } from "@phosphor-icons/react";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import useAuth from "../../../hooks/useAuth";
import "./styles.css";

export function EditarPerfil() {
    const [userData, setUserData] = useState({
        nome: "",
        dataNascimento: "",
        telefone: "",
        email: "",
    });

    const { user } = useAuth(); // Pega o usuário autenticado

    useEffect(() => {
        // Buscar dados do usuário logado no localStorage
        const users_bd = JSON.parse(localStorage.getItem("users_bd"));

        // Encontre o usuário logado em users_bd
        const loggedUser = users_bd.find(u => u.id === user.id); // Usa o 'user' do contexto

        if (loggedUser) {
            setUserData({
                nome: loggedUser.nome,
                dataNascimento: loggedUser.dataNascimento,
                telefone: loggedUser.telefone,
                email: loggedUser.email,
            });
        }
    }, [user]); // Executa o efeito quando 'user' estiver disponível

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aqui você pode salvar as alterações no localStorage ou enviar para uma API
        const users_bd = JSON.parse(localStorage.getItem("users_bd"));

        // Atualiza apenas o usuário logado
        const updatedUsers = users_bd.map(u =>
            u.id === user.id
                ? { ...u, ...userData } // Atualiza os dados do usuário logado
                : u // Mantém os demais usuários inalterados
        );

        localStorage.setItem("users_bd", JSON.stringify(updatedUsers));
        alert("Perfil atualizado com sucesso!");
    };

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
                        value={userData.nome}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="dataNascimento">Defina sua data de Nascimento</label>
                    <input
                        type="date"
                        name="dataNascimento"
                        id="dataNascimento"
                        value={userData.dataNascimento}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="telefone">Telefone</label>
                    <input
                        type="number"
                        name="telefone"
                        id="telefone"
                        placeholder="(+00) 00 00000-0000"
                        value={userData.telefone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="button-foto-perfil">
                    <p>Alterar foto de perfil</p>
                    <UploadSimple size={25} />
                </div>

                <input type="submit" value="Salvar Alterações" className="salvar-editar-perfil" />
            </form>
        </div>
    );
}
