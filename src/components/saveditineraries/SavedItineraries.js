import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SavedItineraries.css";

const SavedItineraries = () => {
  const [itineraries, setItineraries] = useState([])

  useEffect( () => {
    getItineraries()
  }, [])

  function getItineraries() {
    fetch("https://enigmatic-harbor-21766-4fbcc08ecd57.herokuapp.com/api/v1/itineraries")
    .then(response => response.json())
    .then(data => {
      setItineraries(data.data || [])
    })
    .catch(error => console.log(error))
  }

  return (
    <main className="saved-itinerary-container"> 
      <h1 className="title">Journey Like a Genius</h1> 
      <section className="saved-itinerary-content"> 
        <div className="saved-itinerary-details"> 
        {itineraries.length > 0 ? (
          itineraries.map((itinerary) => ( 
            <article key={itinerary.id} className="saved-single-itinerary"> 
              <h4 className="saved-itinerary-title"> Itinerary for {itinerary.attributes.city} - {itinerary.attributes.duration} day </h4>
              <section className="saved-itinerary-items" > 
                {itinerary.attributes.items.length > 0 ? (
                  itinerary.attributes.items.map((item) => ( 
                    <div className="saved-itinerary-info" key={item.id}> 
                      <strong>{item.name}</strong> <br />
                      {item.address} <br />
                      Regular Hours: {item.opening_hours} <br />
                      {item.phone} 
                    </div>
                  ))
                ) : (
                  <p> No items for this itinerary. </p>
                )}
              </section>
            </article>
            ))
          ) : (
            <p>No itineraries available.</p>
          )}
        </div>
        <Link to={'/'}>
        <button className="saved-button"> Back to home </button>
        </Link>
      </section>
    </main>
  )
}

export default SavedItineraries;