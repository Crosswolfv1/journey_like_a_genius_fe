import React, { useState } from "react";
import Map from "./components/Map";
import Homepage from "./components/Homepage";
import Preferences from "./components/Preferences";
import Itinerary from "./components/Itinerary";
import { Routes, Route} from 'react-router-dom';

const App = () => {
  const [showPreferences, setShowPreferences] = useState(false)

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Routes>
        <Route path="/" element={
          !showPreferences ? (
            <Homepage setShowPreferences={setShowPreferences} /> ) : (<Preferences />) } />
          // {/* <h1>Google Maps with React</h1>
          // <Map /> */}
        <Route path="/itinerary/:user_id" element={<Itinerary/>} />
      </Routes>
    </div>
  );
};

export default App;
