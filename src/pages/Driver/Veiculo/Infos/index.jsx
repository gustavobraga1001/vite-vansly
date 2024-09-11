import HeaderFixo from "../../../../components/HeaderFixo/headerFixo";
import "./styles.css";

import { v4 as uuidv4 } from 'uuid';
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


export function InfoVeiculo() {

    const { user } = useAuth()

    const navigate = useNavigate();


    function handleSubmitVeiculo(e) {
        e.preventDefault();

        // Usando FormData para pegar todos os valores do formulário
        const formData = new FormData(e.target);

        // Convertendo para um objeto para facilitar o uso
        const formCamps = Object.fromEntries(formData.entries());

        const newVehicle = {
            id: uuidv4(),
            userId: user.id,
            ...formCamps
        };

        // Pegando os dados já armazenados no localStorage
        const veiculosExistentes = JSON.parse(localStorage.getItem("veiculos_bd")) || [];

        // Adicionando o novo veículo à lista existente
        const veiculosAtualizados = [...veiculosExistentes, newVehicle];

        // Salvando a lista atualizada no localStorage
        localStorage.setItem("veiculos_bd", JSON.stringify(veiculosAtualizados));

        // Atualizando o role do usuário logado no array de usuários
        const users = JSON.parse(localStorage.getItem("users_bd")) || [];

        // Encontrando o usuário logado no array e atualizando o role
        const updatedUsers = users.map(u => {
            if (u.id === user.id) {
                return { ...u, role: 2 }; // Atualiza o role para 2
            }
            return u; // Mantém os outros usuários inalterados
        });

        // Salvando o array de usuários atualizado no localStorage
        localStorage.setItem("users_bd", JSON.stringify(updatedUsers));

        // Navegar para a página de perfil
        navigate("/perfil");
    }

    return (
        <div className="infos-veiculo-container">
            <HeaderFixo text={"Cadastramento de veículo"} tela={"motorista/veiculo"} />

            <form onSubmit={handleSubmitVeiculo}>
                <div>
                    <label htmlFor="marca">Marca do veículo</label>
                    <select id="marca" name="marca" defaultValue="" required>
                        <option value="" disabled>Selecione a marca</option>
                        <option value="marca1">Marca 1</option>
                        <option value="marca2">Marca 2</option>
                        <option value="marca3">Marca 3</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="modelo">Modelo do veículo</label>
                    <input type="text" id="modelo" name="modelo" placeholder="Modelo" required />
                </div>

                <div>
                    <label htmlFor="ano">Ano de fabricação</label>
                    <select id="ano" name="ano" defaultValue="" required>
                        <option value="" disabled>Selecione o ano</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="cor">Cor do veículo</label>
                    <input type="text" id="cor" name="cor" placeholder="Cor" required />
                </div>

                <div>
                    <label htmlFor="placa">Placa</label>
                    <input type="text" id="placa" name="placa" placeholder="Placa" required />
                </div>

                <div>
                    <label htmlFor="renavam">Renavam</label>
                    <input type="number" id="renavam" name="renavam" placeholder="Renavam" required />
                </div>

                <div>
                    <label htmlFor="capacidade">Capacidade de passageiros</label>
                    <input type="number" id="capacidade" name="capacidade" placeholder="Qtd. total de vagas" required />
                </div>

                <button type="submit" className="a-azul">Prosseguir</button>
            </form>
        </div>
    );
}
