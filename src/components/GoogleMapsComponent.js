import React, { useEffect, useRef, useState } from "react";
import useGoogleMaps from "../hooks/useGoogleMaps";

const GoogleMapsComponent = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded, error } = useGoogleMaps(apiKey); // Proper destructuring
  const mapRef = useRef(null);
  const [places, setPlaces] = useState([]);

  async function findPlaces(query) {
    const { Place } = await window.google.maps.importLibrary("places");
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
    const request = {
      textQuery: query,
      fields: ["displayName", "id", "accessibilityOptions", "allowsDogs", "formattedAddress", "isGoodForChildren", "isGoodForGroups"],
    };
    const { places } = await Place.searchByText(request);
    console.log(places)
  }  

  useEffect(() => {
    // Ensure google.maps is available and ready to be used
    if (isLoaded && mapRef.current) {
      if (window.google && window.google.maps) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      } else {
        console.error('Google Maps is not available.');
      }
    }
  }, [isLoaded]); // Add isLoaded as a dependency

  if (error) {
    return <p>Error: {error}</p>; // Render the error message
  }

return (
    <div>
      {isLoaded ? (
        <div>
          <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>

          <div>
            <button onClick={() => findPlaces("musuems in tokyo")}>Search musuems in tokyo</button>
            <button onClick={() => findPlaces("parks in tokyo")}>Search parks in tokyo</button>
            <button onClick={() => findPlaces("ramen in tokyo")}>Search ramen in tokyo</button>
          </div>

          <div>
            <h3>Search Results:</h3>
            <ul>
              {places.map((place, index) => (
                <li key={index}>
                  <p><strong>{place.name}</strong></p>
                  <p>{place.adrFormatAddress}</p>
                  <p>Accessibility: {place.accessibilityOptions ? place.accessibilityOptions.join(", ") : "Not specified"}</p>
                  <p>Allows Dogs: {place.allowsDogs ? "Yes" : "No"}</p>
                  <p>Good for Children: {place.isGoodForChildren ? "Yes" : "No"}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default GoogleMapsComponent;
