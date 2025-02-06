import React from "react";
import Homepage from "./components/homepage/Homepage";
import Preferences from "./components/preferences/Preferences";
import Itinerary from "./components/itinerary/Itinerary";
import SavedItineraries from "./components/saveditineraries/SavedItineraries";
import { Routes, Route} from 'react-router-dom';

const App = () => {

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Routes>
        <Route path="/:userId?" element={<Homepage/>} />
        <Route path="/preferences/:userId?" element={<Preferences/>} />
        <Route path="/itinerary/:userId?" element={<Itinerary/>} />
        <Route path="/saved-itineraries" element={<SavedItineraries/>} />
      </Routes>
    </div>
  );
};

export default App;
