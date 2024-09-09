import { Link } from "react-router-dom";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import { useState } from "react";
import { UploadSimple } from "@phosphor-icons/react";

import "./styles.css";

export function AnuncioEdit() {
  // Estado para os valores do formulário
  const [formValues, setFormValues] = useState({
    regiao: "",
    instituicao: "",
    valor: "",
    infos: "",
    selectedImages: [],
  });

  console.log(formValues);

  // Função para controlar as mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Função para formatar o valor do input de preço em formato de moeda
  const formatCurrency = (value) => {
    const valueOnlyDigits = value.replace(/\D/g, ""); // Remove tudo que não for dígito
    const formattedValue = (Number(valueOnlyDigits) / 100).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
    return formattedValue;
  };

  // Função específica para o campo de valor
  const handleValueChange = (e) => {
    const formattedValue = formatCurrency(e.target.value);
    setFormValues({
      ...formValues,
      valor: formattedValue,
    });
  };

  // Função para lidar com a mudança nos arquivos (upload de imagens)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormValues({
      ...formValues,
      selectedImages: imageUrls,
    });
  };

  // Função para abrir a janela de seleção de arquivos
  const handleButtonClick = (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
  };

  return (
    <div className="anuncio-edit-container">
      <HeaderFixo text={"Edição de anúncio"} tela={"perfil"} />

      <form>
        <div>
          <label htmlFor="regiao">Regiões de atendimento</label>
          <select
            id="regiao"
            name="regiao"
            value={formValues.regiao}
            onChange={handleInputChange}
            required
          >
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
          <select
            id="instituicao"
            name="instituicao"
            value={formValues.instituicao}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Nome da instituição
            </option>
            <option value="instituicao1">Instituição 1</option>
            <option value="instituicao2">Instituição 2</option>
            <option value="instituicao3">Instituição 3</option>
          </select>
        </div>

        <Link className="edit-horarios-anuncio">
          Adicionar horários e vagas
        </Link>

        <div>
          <label htmlFor="valor">Preço mensal do serviço</label>
          <input
            type="text"
            id="valor"
            name="valor"
            placeholder="R$ 0,00"
            value={formValues.valor}
            onChange={handleValueChange}
            required
          />
        </div>

        <div>
          <label htmlFor="infos">Informações adicionais</label>
          <textarea
            name="infos"
            id="infos"
            placeholder="Informações..."
            value={formValues.infos}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <button id="customButton" onClick={handleButtonClick}>
          Enviar fotos
          <UploadSimple size={32} />
        </button>
      </form>
    </div>
  );
}
