/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import "./Locais.css";
import returnImg from "../../../assets/icons/return-anuncio.svg";
import iconeMovel from "../../../assets/map.svg";
import iconeSelect from "../../../assets/select-icon.svg";
import { useDadosViagem } from "../../../contexts/DadosViagemContext";

const Locais = () => {
  const { id } = useParams();

  const { contrato, setContrato, ida, destino, desembarque, setIda, setDestino, setDesembarque, motorista, setMotorista } =
    useDadosViagem();

  const [period, setPeriod] = useState("")

  const [ativado, setAtivado] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setAtivado(!ativado);
  };

  const handleProsseguir = () => {
    if (ativado) {
      if (!ida || !destino || !period) {
        setError("Preencha todos os campos");
        return;
      }
      
      setContrato(prevContrato => ({
        ...prevContrato, // Mantém as propriedades antigas
        period,
        boarding: ida,
        institution: destino
      }));
    } else {
      if (!ida || !destino || !desembarque || !period) {
        setError("Preencha todos os campos");
        console.log(error);
        return;
      }
  
      setContrato(prevContrato => ({
        ...prevContrato, // Mantém as propriedades antigas
        period,
        boarding: ida,
        landing: desembarque,
        institution: destino
      }));
    }

    navigate(`/contrato/info/${id}`);

  
    console.log(contrato);
  };
  console.log(contrato);
  

  return (
    <div className="box-locais">
      <HeaderFixo
        tela={`anuncio/${id}`}
        img={returnImg}
        text={"Embarque e desembarque"}
        backColor={"#003B6D"}
        textColor={"#FFFFFF"}
      />
      <div className="ida-locais">
        <p>Apenas viagem de ida</p>
        <div
          className={`toggle-container ${ativado ? "ativo" : ""}`}
          onClick={handleClick}
        >
          <div className="toggle-ball"></div>
        </div>
      </div>
      <div className="input-locais">
        <p>Local de embarque (ida)</p>
        <div>
          <input
            type="text"
            placeholder="Ponto de embarque"
            onChange={(e) => [setIda(e.target.value), setError("")]}
          />
          <img src={iconeMovel} alt="" />
        </div>
      </div>
      <div className="input-locais">
        <p>Ponto de destino</p>
        <div>
          <select
            className="combo-box-locais"
            onChange={(e) => setDestino(e.target.value)}
          >
            <option value="">Destino</option>
            <option value="USCS - BARCELONA">USCS - BARCELONA</option>
            <option value="USCS - CONCEIÇÃO">USCS - CONCEIÇÃO</option>
            <option value="USCS - CENTRO">USCS - CENTRO</option>
          </select>
          <img src={iconeSelect} alt="" />
        </div>
      </div>
      {!ativado ? (
        <div className="input-locais">
          <p>Local de desembarque (volta)</p>
          <div>
            <input
              type="text"
              placeholder="Ponto de desembarque"
              onChange={(e) => setDesembarque(e.target.value)}
            />
            <img src={iconeMovel} alt="" />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="input-locais">
        <p>Periodo</p>
        <div>
          <select
            className="combo-box-locais"
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="">Periodo</option>
            <option value="MANHA">MANHÃ</option>
            <option value="TARDE">TARDE</option>
            <option value="NOITE">NOITE</option>
          </select>
          <img src={iconeSelect} alt="" />
        </div>
      </div>
      <p className="label-error-novo">{error}</p>
      <div className="box-prosseguir">
        <button className="prosseguir" onClick={handleProsseguir}>
          Prosseguir
        </button>
      </div>
    </div>
  );
};

export default Locais;
