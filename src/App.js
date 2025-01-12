import React, { useState } from "react";
import Map from "./components/Map";
import Homepage from "./components/Homepage";
import Preferences from "./components/Preferences";

const App = () => {
  const [showPreferences, setShowPreferences] = useState(false)

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* <h1>Google Maps with React</h1>
      <Map /> */}
      { !showPreferences ? (
        <Homepage setShowPreferences={setShowPreferences} /> 
        ) : (
          <Preferences />
        ) }
    </div>
  );
};

export default App;
