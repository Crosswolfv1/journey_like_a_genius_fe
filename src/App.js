import React from "react";
import Map from "./components/Map";
import Homepage from "./components/Homepage";

const App = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* <h1>Google Maps with React</h1>
      <Map /> */}
      <Homepage />
      <Preferences />
    </div>
  );
};

export default App;
