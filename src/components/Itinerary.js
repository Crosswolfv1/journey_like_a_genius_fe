import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./Itinerary.css";

const Itinerary = () => {
  const [activityPlaces, setActivityPlaces] = useState([]);  
  const [foodPlaces, setFoodPlaces] = useState([]);  

  const dummyItems = [
    {id: 1, item_type: "restaurant", name: "Café de Flore", address: "172 Bd Saint-Germain, 75006 Paris, France", opening_hours: [
      "Everyday: 7:30 AM – 2:00 AM",
     ], phone: "+33 1 45 48 55 26"},
    {id: 2, item_type: "activity", name: "Musée d'Orsay", address: "Esplanade Valéry Giscard d'Estaing, 75007 Paris, France", opening_hours: [
      "Monday: Closed",
      "Tuesday, Wedensday, Thursday, Friday, Saturday, Sunday: 9:30 AM – 6:00 PM",
     ], phone: "+33 1 40 49 48 14"},
     {id: 3, item_type: "restaurant", name: "Le comptoir du Relais", address: "9 Carr de l'Odéon, 75006 Paris, France", opening_hours: [
      "Everyday: 12:00 PM – 11:00 PM,",
     ], phone: "+33 1 40 49 48 14"},
     {id: 4, item_type: "activity", name: "Jardin des Tuileries", address: "48 Rue du Vertbois, 75003 Paris, France", opening_hours: [
      "Not specified",
     ], phone: "Not specified"},
  ]
  const location = useLocation()
  const preferences = location.state

  function handleSubmit() {
    findActivityPlaces(preferences)
    findFoodPlaces(preferences)
    console.log('Preferences to pass to API:', preferences)
  }

  async function findActivityPlaces() {
    const { Place } = await window.google.maps.importLibrary("places");
    const activityRequest = {
      textQuery: `${preferences.activityType} in ${preferences.searchTerm}`,
      fields: ["displayName", "id", "accessibilityOptions", "allowsDogs", "formattedAddress", "isGoodForChildren", "isGoodForGroups", "priceLevel", "types", "regularOpeningHours", "internationalPhoneNumber"],
    };
    const { places } = await Place.searchByText(activityRequest);
    setActivityPlaces(places)
  }  

  async function findFoodPlaces() {
    const { Place } = await window.google.maps.importLibrary("places");
    const foodRequest = {
      textQuery: `${preferences.foodType} food in ${preferences.searchTerm}`,
      fields: ["displayName", "id", "accessibilityOptions", "allowsDogs", "formattedAddress", "isGoodForChildren", "isGoodForGroups", "priceLevel", "types", "regularOpeningHours", "internationalPhoneNumber"],
    };
    const { places } = await Place.searchByText(foodRequest);
    setFoodPlaces(places)
  }  

  useEffect(() => {
    activityPlaces.forEach(element => {
      console.log("Updated activityPlaces:", element.Eg);
    })
    foodPlaces.forEach(element => {
      console.log("food places:", element.Eg)
    })
  }, [activityPlaces, foodPlaces]);

  useEffect(() => {
    console.log(preferences)
    handleSubmit(preferences)
  }, [])

  return (
    <main className="itinerary-container">
      <h1 className="title">Journey Like a Genius</h1>
        <section className="itinerary-content">
          <div className="itinerary-details">
          <h4 className="itinerary-generated-message">Thank you for your information. A personalized itinerary has been generated to meet your needs.</h4>
              <p>
                {dummyItems.map((item) => (
                  <p><strong>{item.name}</strong><br /> 
                    {item.address}<br /> 
                    Regular Hours: {item.opening_hours}<br /> 
                    {item.phone}</p>
                ))}
              </p>
            <button>Try another itinerary</button>
          </div>
        </section>
    </main>
  )
}

export default Itinerary;