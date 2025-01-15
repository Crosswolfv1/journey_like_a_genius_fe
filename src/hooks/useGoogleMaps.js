import { useEffect, useState } from "react";

const useGoogleMaps = (apiKey) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google && window.google.maps) {
        setIsLoaded(true);
      } else {
        setError("Google Maps API failed to load.");
      }
    };

    script.onerror = () => setError("Failed to load Google Maps API.");
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [apiKey]);

  return { isLoaded, error };
};

export default useGoogleMaps;
