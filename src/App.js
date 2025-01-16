import React, { useState } from "react";
import Map from "./components/Map";
import Homepage from "./components/Homepage";
import Preferences from "./components/Preferences";
import Itinerary from "./components/Itinerary";
import SavedItineraries from "./components/SavedItineraries";
import { Routes, Route} from 'react-router-dom';

const App = () => {

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/preferences" element={<Preferences/>} />
        <Route path="/itinerary/:user_id" element={<Itinerary/>} />
        <Route path="/saved-itineraries" element={<SavedItineraries/>} />
      </Routes>
    </div>
  );
};

export default App;
