import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import infoCards from "../../Home/infoCard";
import HeaderFixo from "../../../components/HeaderFixo/headerFixo";
import "./Locais.css";
import returnImg from "../../../assets/icons/return-anuncio.svg";
import iconeMovel from "../../../assets/map.svg";
import iconeSelect from "../../../assets/select-icon.svg";
import { useDadosSensiveis } from "../../../contexts/DadosSensiveis";

const Locais = () => {
  const { id } = useParams();
  const card = infoCards.filter((card) => card.id == id);

  const [ativado, setAtivado] = useState(false);
  const [ida, setIda] = useState("");
  const [destino, setDestino] = useState("");
  const [desembarque, setDesembarque] = useState("");
  const [error, setError] = useState("");

  const handleSelecaoChange = (event) => {
    setDestino(event.target.value);
  };

  const handleClick = () => {
    setAtivado(!ativado);
  };

  const { setDadosSensiveis } = useDadosSensiveis();

  const handleProsseguir = () => {
    // Definir os dados sensíveis usando o contexto
    setDadosSensiveis({
      ida: ida,
      destino: destino,
      desembarque: desembarque,
    });

  };

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
          <select className="combo-box-locais" onChange={handleSelecaoChange}>
            <option value="">Destino</option>
            <option value="USCS - BARCELONA">USCS - BARCELONA</option>
            <option value="USCS - CONCEIÇÃO">USCS - CONCEIÇÃO</option>
            <option value="USCS - CENTRO">USCS - CENTRO</option>
          </select>
          <img src={iconeSelect} alt="" />
        </div>
      </div>
      {ativado ? (
        <div className="input-locais">
          <p>Local de desembarque (volta)</p>
          <div>
            <input
              type="text"
              placeholder="Ponto de desembarque"
              onChange={(e) => [setDesembarque(e.target.value), setError("")]}
            />
            <img src={iconeMovel} alt="" />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="box-prosseguir">
        <Link to={`/contrato/info/${id}`}>
          <button className="prosseguir" onClick={handleProsseguir}>
            Prosseguir
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Locais;
