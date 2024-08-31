import React from "react";
import img from "../../assets/Return.svg";
import HeaderFixo from "../../components/HeaderFixo/headerFixo";
import "./percurso.css";
import MapPage from "../../components/Maps/Maps";
import Footer from "../../components/Footer";
import useUserLocation from "../../hooks/useUserLocation";

const Percurso = () => {

  const { userLocation, error } = useUserLocation();

  const defaultLocation = {
    lat: -23.62178148779765,
    lng: -46.56528250493589,
  };

  return (
    <div className="box-percurso">
      <div className="main-percurso">
        <HeaderFixo tela="home" img={img} text="Percurso" />
        {error ? (
          <MapPage userLocation={defaultLocation} />
        ) : <MapPage userLocation={useUserLocation} />}
      </div>

      <Footer home={false} presenca={false} percurso={true} perfil={false} />
    </div>
  );
};

export default Percurso;
