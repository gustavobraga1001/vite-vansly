import React from "react";
import img from "../../assets/Return.svg";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import "./percurso.css";
import MapPage from "../../components/Maps/Maps";
import Footer from "../../components/Footer";
import useUserLocation from "../../hooks/useUserLocation";
import { useEffect } from "react";
import { useState } from "react";

const Percurso = () => {

  const [localizacao, setLocalizacao] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const obterLocalizacao = () => {
    setCarregando(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocalizacao({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setErro(null);
          setCarregando(false);
        },
        (error) => {
          setErro(error.message);
          setCarregando(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000, // 5 segundos
          maximumAge: 0,
        }
      );
    } else {
      setErro("Geolocalização não é suportada pelo navegador.");
      setCarregando(false);
    }
  };


  useEffect(() => {
    obterLocalizacao()
    console.log(localizacao)
  }, []);


  return (
    <div className="box-percurso">
      <div className="main-percurso">
        <HeaderFixo tela="home" img={img} text="Percurso" />
        {carregando ? (
          <p>Carregando localização...</p>
        ) : localizacao ? (
          <div>
            <MapPage userLocation={localizacao} />
          </div>
        ) : (
          <p>Localização não disponível</p>
        )}
      </div>

      <Footer home={false} presenca={false} percurso={true} perfil={false} />
    </div>
  );
};

export default Percurso;
