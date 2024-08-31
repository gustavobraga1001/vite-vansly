import React, { useEffect, useState } from 'react';
import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import imgVan from '../../assets/iconeMovel.svg';
import { stylesMaps } from './StyleMaps';
import btnLoc from '../../assets/btn-loc.svg'

import './Maps.css';

const center = {
  lat: -23.62178148779765,
  lng: -46.56528250493589,
};

const MapPage = ({ userLocation }) => {
  const [waypoints, setWaypoints] = useState([]);
  const [map, setMap] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [response, setResponse] = useState(null);

  const onMapLoad = map => {
    setMap(map);
  };

  useEffect(() => {
    setOrigin({ lat: -23.625046561701133, lng: -46.52039028647473 });
    setDestination({ lat: -23.618485377185664, lng: -46.57856412063509 });
    setWaypoints([
      { lat: -23.634274926423352, lng: -46.526985241377645 },
      { lat: -23.636358643864003, lng: -46.54355056389266 }
    ]);
  }, []);

  const directionsServiceoptions = React.useMemo(() => {
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

  function myFunction() {
    map?.panTo(waypoints[0]);
  }

  return (
    <div className="map">
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_CHAVE_API}
        libraries={['places']}
      >
        <GoogleMap
          onLoad={onMapLoad}
          center={userLocation || center}
          zoom={15}
          options={{
            zoomControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            scaleControl: true,
            styles: stylesMaps
          }}
          mapContainerStyle={{ width: '100%', height: '100%' }}
        >
          <img src={btnLoc} alt="" className="button-maps" onClick={myFunction} />

          <Marker position={userLocation} icon={{
            url: imgVan,
          }} />

          {origin && destination && (
            <DirectionsService
              options={directionsServiceoptions}
              callback={directionsCallback}
            />
          )}

          {response && directionsRendererOptions && (
            <DirectionsRenderer options={directionsRendererOptions} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPage;



