import { Link, useNavigate } from "react-router-dom";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import { useState, useEffect } from "react";
import { UploadSimple } from "@phosphor-icons/react";
import { v4 as uuidv4 } from 'uuid';  // Importando o UUID
import Swal from "sweetalert2";  // Para o popup

import useAuth from "../../../hooks/useAuth"

import "./styles.css";

export function AnuncioEdit() {
  const { user } = useAuth()

  const [formValues, setFormValues] = useState({
    regiao: "",
    instituicao: "",
    valor: "",
    infos: "",
    selectedImages: [],
  });

  const [horarios, setHorarios] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera os horários do localStorage que foram salvos na tela anterior
    const storedHorarios = JSON.parse(localStorage.getItem("anuncios_horarios"));
    if (storedHorarios) {
      setHorarios(storedHorarios);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formatCurrency = (value) => {
    const valueOnlyDigits = value.replace(/\D/g, "");
    const formattedValue = (Number(valueOnlyDigits) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formattedValue;
  };

  const handleValueChange = (e) => {
    const formattedValue = formatCurrency(e.target.value);
    setFormValues({
      ...formValues,
      valor: formattedValue,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormValues({
      ...formValues,
      selectedImages: imageUrls,
    });
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
  };


  console.log(horarios)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Recupera os anúncios já existentes ou inicializa um array vazio
    const anuncios = JSON.parse(localStorage.getItem("anuncios_bd")) || [];


    // Cria um novo anúncio com ID único usando o uuid
    const newAnuncio = {
      id: uuidv4(),
      img: formValues.selectedImages,  // Aqui você pode ajustar o formato de armazenamento das imagens
      title: `Van do ${user.nome}`,
      local: formValues.regiao,
      preco: formValues.valor,
      infos: formValues.infos,
      instituicoes: [formValues.instituicao],
      horarios,  // Os horários que foram salvos em outra tela
      userId: user.id
    };

    // Adiciona o novo anúncio à lista de anúncios e salva no localStorage
    anuncios.push(newAnuncio);
    localStorage.setItem("anuncios_bd", JSON.stringify(anuncios));

    // Mostra um popup de sucesso com SweetAlert2
    Swal.fire({
      title: 'Anúncio Salvo!',
      text: 'Seu anúncio foi salvo com sucesso.',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    // Redireciona para outra página, por exemplo, a página inicial
    // Limpa o formulário
    setFormValues({
      regiao: "",
      instituicao: "",
      valor: "",
      infos: "",
      selectedImages: [],
    });
  };

  return (
    <div className="anuncio-edit-container">
      <HeaderFixo text={"Edição de anúncio"} tela={"perfil"} />

      <form onSubmit={handleSubmit}>
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

        <Link className="edit-horarios-anuncio" to={"horarios-vagas"}>
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
          <UploadSimple size={25} />
        </button>

        <div className="box-fix-button">
          <input type="submit" value="Salvar" />
        </div>
      </form>
    </div>
  );
}
