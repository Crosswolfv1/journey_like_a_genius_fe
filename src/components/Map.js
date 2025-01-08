import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // San Francisco latitude (initial value)
  lng: -122.4194, // San Francisco longitude (initial value)
};

const Map = () => {
  const inputRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [placesData, setPlacesData] = useState([]); // State to store places data
  const [loading, setLoading] = useState(true); // State to track loading status

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Function to fetch data based on the request
  const fetchPlacesData = async () => {
    const request = {
      textQuery: "Tacos in Mountain View",
      fields: ["name", "geometry", "business_status"],
      locationBias: { lat: 37.4161493, lng: -122.0812166 },
      isOpenNow: true,
      language: "en-US",
      region: "us",
      minRating: 3.2,
      maxResultCount: 8,
      useStrictTypeFiltering: false,
    };
  
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
    } catch (error) {
      console.error("Error fetching places data:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPlacesData(); // Fetch places data when the component mounts
  }, []);

  useEffect(() => {
    if (placesData.length > 0) {
      // Set the center to the first place's location (or choose one as you prefer)
      const firstPlace = placesData[0];
      if (firstPlace.geometry) {
        setMapCenter({
          lat: firstPlace.geometry.location.lat,
          lng: firstPlace.geometry.location.lng,
        });
      }
    }
  }, [placesData]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <div style={{ marginBottom: "20px" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a place"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />
        {selectedPlace && (
          <div style={{ marginTop: "10px" }}>
            <strong>Place Name:</strong> {selectedPlace.name || "N/A"}
          </div>
        )}
      </div>

      {loading ? (
        <div>Loading places...</div>
      ) : (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={12}>
          {/* Add markers for each place */}
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
