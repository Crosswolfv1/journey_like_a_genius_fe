import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SavedItineraries.css";

const SavedItineraries = () => {
  const [itineraries, setItineraries] = useState([])

  useEffect( () => {
    getItineraries()
  }, [])

  function getItineraries() {
    fetch("http://localhost:3000/api/v1/itineraries")
    .then(response => response.json())
    .then(data => {
      setItineraries(data.data || [])
    })
    .catch(error => console.log(error))
  }

  return (
    <main className="itinerary-container"> 
      <h1 className="title">Journey Like a Genius</h1> 
      <section className="itinerary-content"> 
        <div className="itinerary-details"> 
          {itineraries.map((itinerary) => ( 
            <article key={itinerary.id} className="single-itinerary"> 
              <h4>  Itinerary for {itinerary.attributes.city} - {itinerary.attributes.duration} day </h4>
              <section className="itinerary-items" > 
                {itinerary.attributes.items.map((item) => ( 
                  <div key={item.id}> 
                    <strong>{item.name}</strong> <br />
                    {item.address} <br />
                    Regular Hours: {item.opening_hours} <br />
                    {item.phone} 
                  </div>
                ))}
              </section>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default SavedItineraries;