import React from "react";
import GoogleMapsComponent from "./components/GoogleMapsComponent";

const App = () => {
  return (
    
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Google Maps with React</h1>
      <GoogleMapsComponent />
    </div>
  );
};

export default App;
