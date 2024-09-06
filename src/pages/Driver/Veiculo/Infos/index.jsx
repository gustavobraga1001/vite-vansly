import HeaderFixo from "../../../../components/HeaderFixo/headerFixo";

import "./styles.css"

export function InfoVeiculo() {
    return (
        <div className="infos-veiculo-container">
            <HeaderFixo text={"Cadastramento de veículo"} tela={"motorista/veiculo"} />

            <form>
                <div>
                    <label htmlFor="opcoes">Marca do veículo</label>
                    <select id="opcoes" name="opcoes">
                        <option value="" disabled selected>Selecione a marca</option>
                        <option value="opcao1">Opção 1</option>
                        <option value="opcao2">Opção 2</option>
                        <option value="opcao3">Opção 3</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="">Modelo do veículo</label>
                    <input type="text" placeholder="Modelo"/>
                </div>

                <div>
                    <label>Ano de fabricação</label>
                    <select id="opcoes" name="opcoes">
                        <option value="" disabled selected>2025</option>
                        <option value="opcao1">Opção 1</option>
                        <option value="opcao2">Opção 2</option>
                        <option value="opcao3">Opção 3</option>
                    </select>
                </div>

                <div>
                    <label>Ano de fabricação</label>
                    <input type="text" placeholder="Cor"/>
                </div>

                <button className="a-azul">Prosseguir</button>
            </form>
        </div>
    )
}