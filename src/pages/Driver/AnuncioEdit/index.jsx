import { Link } from "react-router-dom";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";

import "./styles.css";

export function AnuncioEdit() {
  return (
    <div className="anuncio-edit-container">
      <HeaderFixo text={"Edição de anúncio"} tela={"perfil"} />

      <form>
        <div>
          <label htmlFor="regiao">Regiões de atendimento</label>
          <select id="regiao" name="regiao" defaultValue="" required>
            <option value="" disabled>
              Cidade
            </option>
            <option value="Cidade1">Cidade 1</option>
            <option value="Cidade2">Cidade 2</option>
            <option value="Cidade3">Cidade 3</option>
          </select>
        </div>

        <div>
          <label htmlFor="instituicao">Instituições de atendimento</label>
          <select id="instituicao" name="instituicao" defaultValue="" required>
            <option value="" disabled>
              Nome da instituição
            </option>
            <option value="instituicao1">instituicao 1</option>
            <option value="instituicao2">instituicao 2</option>
            <option value="instituicao3">instituicao 3</option>
          </select>
        </div>

        <Link className="edit-horarios-anuncio">
          Adicionar horários e vagas
        </Link>

        <div>
          <label htmlFor="valor">Preço mensal do serviço</label>
          <input
            type="number"
            id="valor"
            name="valor"
            placeholder="R$ 0,00"
            required
          />
        </div>

        <div>
          <label htmlFor="infos">Informações adicionais</label>
          <textarea
            name="infos"
            id="infos"
            placeholder="Informações..."
          ></textarea>
        </div>
      </form>
    </div>
  );
}
