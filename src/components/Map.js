import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 35.6762, // Tokyo latitude
  lng: 139.6503, // Tokyo longitude
};

const Map = () => {
  const [mapCenter, setMapCenter] = useState(center);
  const [placesData, setPlacesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Define your test requests
  const requests = {
    request1: {
      textQuery: "Ramen in Tokyo",
      fields: ["accessibilityOptions", "adrFormatAddress", "allowsDogs", "isGoodForChildren"],
      includedType: "restaurant",
    },
    request2: {
      textQuery: "Cafes in Tokyo",
      fields: ["accessibilityOptions", "adrFormatAddress", "allowsDogs", "isGoodForChildren"],
      includedType: "culture",
    },
    request3: {
      textQuery: "Burgers in Tokyo",
      fields: ["accessibilityOptions", "adrFormatAddress", "allowsDogs", "isGoodForChildren"],
      includedType: "restaurant",
    },
  };
  // Function to fetch data based on the request
  const fetchPlacesData = async (request) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
          request.textQuery
        )}&key=${apiKey}`
      );
      const data = await response.json();
      setPlacesData(data.results);
      setLoading(false);

      // Update map center to the first result, if available
      if (data.results.length > 0) {
        const firstPlace = data.results[0];
        if (firstPlace.geometry) {
          setMapCenter({
            lat: firstPlace.geometry.location.lat,
            lng: firstPlace.geometry.location.lng,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching places data:", error);
      setLoading(false);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => fetchPlacesData(requests.request1)}>Ramen in Tokyo</button>
        <button onClick={() => fetchPlacesData(requests.request2)}>Cafes in Tokyo</button>
        <button onClick={() => fetchPlacesData(requests.request3)}>Burgers in Tokyo</button>
      </div>

      {loading ? (
        <div>Loading places...</div>
      ) : (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={12}>
          {placesData.map((place, index) => (
            <Marker
              key={index}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
            />
          ))}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default Map;
