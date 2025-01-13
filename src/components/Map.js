import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 35.6762, // Tokyo latitude
  lng: 139.6503, // Tokyo longitude
};

// const Map = () => {
//   const [mapCenter, setMapCenter] = useState(center);
//   const [placesData, setPlacesData] = useState([]);
//   const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

//   // Define your test requests
  const requests = {
    request1: {
      textQuery: "Ramen in Tokyo",
      fields: ["places.accessibilityOptions", "adrFormatAddress", "allowsDogs", "isGoodForChildren"],
      includedType: "restaurant",
    },
    request2: {
      textQuery: "Cafes in Tokyo",
      fields: ["places.accessibilityOptions", "adrFormatAddress", "allowsDogs", "isGoodForChildren"],
      includedType: "culture",
    },
    request3: {
      textQuery: "Burgers in Tokyo",
      fields: ["places.accessibilityOptions", "adrFormatAddress", "allowsDogs", "isGoodForChildren"],
      includedType: "restaurant",
    },
    request4: {
      textQuery: "Tacos in Mountain View",
      fields: ["displayName", "location", "businessStatus"],
      includedType: "restaurant",
      locationBias: { lat: 37.4161493, lng: -122.0812166 },
      isOpenNow: true,
      language: "en-US",
      maxResultCount: 8,
      minRating: 3.2,
      region: "us",
      useStrictTypeFiltering: false,
    }
  };
//   // Function to fetch data based on the request
//   const fetchPlacesData = async (request) => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
//           request.textQuery
//         )}&fields=${encodeURIComponent(request.fields.join(','))}&type=${encodeURIComponent(
//           request.includedType
//         )}&key=${apiKey}`
//       );
//       const data = await response.json();
//       setPlacesData(data.results.slice(0, 10));
//       setLoading(false);
//       console.log("all", data.results)
//       console.log("first", data.results[0])


//       // Update map center to the first result, if available
//       if (data.results.length > 0) {
//         const firstPlace = data.results[0];
//         if (firstPlace.geometry) {
//           setMapCenter({
//             lat: firstPlace.geometry.location.lat,
//             lng: firstPlace.geometry.location.lng,
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching places data:", error);
//       setLoading(false);
//     }
//   };

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${apiKey}`,
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])



//   return (
//     <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      // <div style={{ marginBottom: "20px" }}>
      //   <button onClick={() => fetchPlacesData(requests.request1)}>Ramen in Tokyo</button>
      //   <button onClick={() => fetchPlacesData(requests.request2)}>Cafes in Tokyo</button>
      //   <button onClick={() => fetchPlacesData(requests.request3)}>Burgers in Tokyo</button>
      //   <button onClick={() => fetchPlacesData(requests.request4)}>Tacos in Mountain View</button>
      // </div>

//       {loading ? (
//         <div>Loading places...</div>
//       ) : (
//         <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={12}>
//           {placesData.map((place, index) => (
//             <Marker
//               key={index}
//               position={{
//                 lat: place.geometry.location.lat,
//                 lng: place.geometry.location.lng,
//               }}
//             />
//           ))}
//         </GoogleMap>
//       )}
//     </LoadScript>
//   );
// };

// export default Map;


return isLoaded ? (
  <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={10}
    onLoad={onLoad}
    onUnmount={onUnmount}
  >
    
    {/* Child components, such as markers, info windows, etc. */}
    <></>
  </GoogleMap>
) : (
  <></>
)
}

export default MyComponent