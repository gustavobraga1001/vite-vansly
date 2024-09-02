import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, Marker, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import imgVan from '../../assets/iconeMovel.svg';
import { stylesMaps } from './StyleMaps';
import btnLoc from '../../assets/btn-loc.svg';
import './Maps.css';

const MapPage = ({ userLocation }) => {
  const [map, setMap] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [response, setResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentUserLocation, setCurrentUserLocation] = useState(userLocation);

  // Atualiza a localização do usuário a cada 30 segundos
  useEffect(() => {
    const updateLocation = () => {
      setCurrentUserLocation(userLocation);
    };

    updateLocation(); // Atualiza a localização inicial

    const intervalId = setInterval(updateLocation, 30000); // Atualiza a localização a cada 30 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, [userLocation]);

  useEffect(() => {
    if (currentUserLocation) {
      const userLatLng = { lat: currentUserLocation.latitude, lng: currentUserLocation.longitude };
      setOrigin(userLatLng);
      setDestination({ lat: -23.618485377185664, lng: -46.57856412063509 });
      setWaypoints([
        { lat: -23.634274926423352, lng: -46.526985241377645 },
        { lat: -23.636358643864003, lng: -46.54355056389266 },
      ]);

      // Centraliza o mapa na localização do usuário
      map?.panTo(userLatLng);
    }
  }, [currentUserLocation, map]);

  useEffect(() => {
    if (response && response.routes[0] && response.routes[0].legs[0]) {
      const routeSteps = response.routes[0].legs[0].steps;

      const moveAlongRoute = () => {
        if (currentStep < routeSteps.length) {
          const nextStep = routeSteps[currentStep];
          setCurrentUserLocation({
            latitude: nextStep.end_location.lat(),
            longitude: nextStep.end_location.lng(),
          });
          setCurrentStep(currentStep + 1);
        }
      };

      const intervalId = setInterval(moveAlongRoute, 3000); // Move a cada 3 segundos

      return () => clearInterval(intervalId);
    }
  }, [response, currentStep]);

  const directionsServiceOptions = React.useMemo(() => {
    return {
      origin,
      destination,
      waypoints: waypoints.map(point => ({ location: point })),
      travelMode: 'DRIVING',
    };
  }, [origin, destination, waypoints]);

  const directionsCallback = React.useCallback(res => {
    if (res !== null && res.status === 'OK') {
      setResponse(res);
    } else {
      console.log(res);
    }
  }, []);

  const directionsRendererOptions = React.useMemo(() => {
    return {
      directions: response,
    };
  }, [response]);

  const recenterMap = () => {
    if (currentUserLocation && map) {
      const userLatLng = { lat: currentUserLocation.latitude, lng: currentUserLocation.longitude };
      map.panTo(userLatLng);
    }
  };

  return (
    <div className="map">
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_CHAVE_API}
        libraries={['places']}
      >
        <GoogleMap
          onLoad={setMap}
          center={currentUserLocation ? { lat: currentUserLocation.latitude, lng: currentUserLocation.longitude } : undefined}
          zoom={15}
          options={{
            zoomControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            scaleControl: true,
            styles: stylesMaps,
          }}
          mapContainerStyle={{ width: '100%', height: '100%' }}
        >
          <img src={btnLoc} alt="" className="button-maps" onClick={recenterMap} />

          {currentUserLocation && (
            <Marker
              position={{ lat: currentUserLocation.latitude, lng: currentUserLocation.longitude }}
              icon={{ url: imgVan }}
            />
          )}

          {origin && destination && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
          )}

          {response && (
            <DirectionsRenderer options={directionsRendererOptions} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPage;
