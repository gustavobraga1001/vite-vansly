import React, { useEffect, useRef, useState } from "react";
import "./InputMaps.css";
import mapImg from "../../assets/map-search.svg";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { useDadosViagem } from "../../contexts/DadosViagemContext";

// Defina as bibliotecas como uma constante fora do componente
const libraries = ["places"];

const InputMaps = ({ placeholder, action }) => {
  const { ida, destino, desembarque, setIda, setDestino, setDesembarque } =
    useDadosViagem();

  const inputRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const addressComponents = place.address_components;
      let streetName = "";
      for (let i = 0; i < addressComponents.length; i++) {
        const component = addressComponents[i];
        if (component.types.includes("route")) {
          streetName = component.long_name;
          break; // Pare assim que encontrarmos o nome da rua
        }
      }
      console.log("Nome da rua:", streetName);
      console.log("Latitude:", place.geometry.location.lat());
      console.log("Longitude:", place.geometry.location.lng());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  useEffect(() => {
    if (apiLoaded && autocomplete !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [apiLoaded, autocomplete]);

  return (
    <div>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_CHAVE_API}
        libraries={libraries} // Usando a constante de bibliotecas definida fora do componente
        onLoad={() => setApiLoaded(true)} // Marca a API do Google Maps como carregada quando o script de carregamento é concluído
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className="input-busca">
            <input
              type="text"
              placeholder={placeholder}
              ref={inputRef}
              className="meu-input"
            />
            <img src={mapImg} alt="" />
          </div>
        </Autocomplete>
      </LoadScript>
    </div>
  );
};

export default InputMaps;
