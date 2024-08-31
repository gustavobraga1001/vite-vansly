import { useState, useEffect } from 'react';

const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLoading(false);
                },
                (err) => {
                    console.error('Erro ao obter localização:', err);
                    setError('Erro ao obter localização');
                    setLoading(false);
                },
                {
                    enableHighAccuracy: false, // Tente definir como false para maior compatibilidade
                    timeout: 20000, // Aumente o tempo limite para 20 segundos
                    maximumAge: 0,
                }
            );
        } else {
            setError('Geolocalização não é suportada pelo navegador.');
            setLoading(false);
        }
    }, []);

    return { userLocation, loading, error };
};

export default useUserLocation;
