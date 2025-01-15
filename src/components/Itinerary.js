import React from "react";
import "./Itinerary.css";

const Itinerary = () => {

    return (
      <main className="itinerary-container">
        <h1 className="title">Journey Like a Genius</h1>
          <section className="itinerary-content">
            <div className="itinerary-details">
            <h4 className="itinerary-generated-message">Thank you for your information. A personalized itinerary has been generated to meet your specific needs.</h4>
              <p>Itinerary Item 1</p>
              <p>Itinerary Item 2</p>
              <p>Itinerary Item 3</p>
              <p>Itinerary Item 4</p>
              <button>Try another itinerary</button>
            </div>
          </section>
      </main>
    )
}

export default Itinerary;