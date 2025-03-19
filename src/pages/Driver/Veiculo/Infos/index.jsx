import HeaderFixo from "../../../../components/HeaderFixo/headerFixo";
import "./styles.css";

import useAuth from "../../../../contexts/AuthProvider/useAuth";
import { useQuery } from "react-query";
import Loading from "../../../../components/Loading";
import { useNavigate } from "react-router-dom";
import Api from "../../../../contexts/AuthProvider/services/api";


export function InfoVeiculo() {

    const navigate = useNavigate();

    const auth = useAuth();

    const { data, isLoading } = useQuery(["user"], () => auth.getUser());  

    const user = data?.user;
    
    if (isLoading || !user) {
        return <Loading />;
    }



    async function handleSubmitVeiculo(e) {
        e.preventDefault();

        // Cria um objeto FormData com os dados do formulário
        const formData = new FormData(e.target)

        // Converte os dados para um objeto
        const data = Object.fromEntries(formData.entries())

        const newVehicle = {
            model: data.modelo,
            plate: data.placa,
            mark: data.marca,
            year: data.ano,
            totalCapacity: Number(data.capacidade),
            driverId: user.driver_id
        }

        try {
            await Api.post('/vehicles',  newVehicle);
        } catch (error) {
            throw new Error(error.message);
        }

        navigate('/perfil')

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
