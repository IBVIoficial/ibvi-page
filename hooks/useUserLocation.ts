import {useState, useEffect} from 'react';

interface LocationState {
   latitude: number | null;
   longitude: number | null;
   error: string | null;
   loading: boolean;
}

const useUserLocation = () => {
   const [location, setLocation] = useState<LocationState>({
      latitude: null,
      longitude: null,
      error: null,
      loading: true,
   });

   useEffect(() => {
      if (!navigator.geolocation) {
         setLocation((prevState) => ({
            ...prevState,
            error: 'Geolocalização não é suportada pelo seu navegador.',
            loading: false,
         }));
         return;
      }

      const handleSuccess = (position: GeolocationPosition) => {
         setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            loading: false,
         });
      };

      const handleError = (error: GeolocationPositionError) => {
         let errorMessage = 'Ocorreu um erro ao obter a localização.';
         switch (error.code) {
            case error.PERMISSION_DENIED:
               errorMessage = 'Permissão para acessar a localização foi negada.';
               break;
            case error.POSITION_UNAVAILABLE:
               errorMessage = 'Informação de localização não está disponível.';
               break;
            case error.TIMEOUT:
               errorMessage = 'A requisição para obter a localização expirou.';
               break;
         }
         setLocation((prevState) => ({
            ...prevState,
            error: errorMessage,
            loading: false,
         }));
      };

      const options: PositionOptions = {
         enableHighAccuracy: true,
         timeout: 10000,
         maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
   }, []);

   return location;
};

export default useUserLocation;
