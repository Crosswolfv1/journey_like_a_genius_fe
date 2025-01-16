import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./Itinerary.css";
import useGoogleMaps from "../hooks/useGoogleMaps";


const Itinerary = () => {
  const [activityPlaces, setActivityPlaces] = useState([]);  
  const [foodPlaces, setFoodPlaces] = useState([]);  
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded, error } = useGoogleMaps(apiKey); 
  const [filteredFoodPlaces, setFilteredFoodPlaces] = useState([])
  const [filteredActivityPlaces, setFilteredActivityPlaces] = useState([])


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
    const groupArray = []
    const accessArray = []

    const filteredActivityPlaces = activityPlaces.reduce((acc, element) => {

      const prefGroup = preferences.group?.toString() || '';
      const elementGroup = element.Eg?.isGoodForGroups?.toString() || '';
      const prefDog = preferences.allowsDogs?.toString() || '';
      const elementDog = element.Eg?.allowsDogs?.toString() || '';
      const prefAccess = preferences.accessibility?.toString() || '';
      const elementAccess = element.Eg?.accessibilityOptions?.hasWheelchairAccessibleEntrance?.toString() || '';

        if (prefGroup === elementGroup){
          groupArray.push(element.Eg)
        } else if (prefGroup === "false") {
          groupArray.push(element.Eg)
        }
        if (groupArray.includes(element.Eg) && prefAccess === elementAccess){
          accessArray.push(element.Eg)
        } else if (groupArray.includes(element.Eg) && prefAccess === "false") {
          accessArray.push(element.Eg)
        }
        if (accessArray.includes(element.Eg) && prefDog === elementDog){
          acc.push(element.Eg)
        } else if (accessArray.includes(element.Eg) && prefDog === "false") {
          acc.push(element.Eg)
        }
      return acc;
    }, []);
    console.log('filteredActivityPlaces', filteredActivityPlaces)

    const foodGroupArray = []
    const doosAccessArray = []
    const foodDogArray = []

    const filteredFoodPlaces = foodPlaces.reduce((acc, element) => {

      const prefGroup = preferences.group?.toString() || '';
      const elementGroup = element.Eg?.isGoodForGroups?.toString() || '';
      const prefBudget = preferences.budget?.toString() || '';
      const elementBudget = element.Eg?.priceLevel?.toString().toLowerCase() || '';
      const prefDog = preferences.allowsDogs?.toString() || '';
      const elementDog = element.Eg?.allowsDogs?.toString() || '';
      const prefAccess = preferences.accessibility?.toString() || '';
      const elementAccess = element.Eg?.accessibilityOptions?.hasWheelchairAccessibleEntrance?.toString() || '';

        if (prefGroup === elementGroup){
          foodGroupArray.push(element.Eg)
        } else if (prefGroup === "false") {
          foodGroupArray.push(element.Eg)
        }
        if (foodGroupArray.includes(element.Eg) && prefAccess === elementAccess){
          doosAccessArray.push(element.Eg)
        } else if (foodGroupArray.includes(element.Eg) && prefAccess === "false") {
          doosAccessArray.push(element.Eg)
        }
        if (doosAccessArray.includes(element.Eg) && prefDog === elementDog){
          foodDogArray.push(element.Eg)
        } else if (accessArray.includes(element.Eg) && prefDog === "false") {
          foodDogArray.push(element.Eg)
        }
        if (foodDogArray.includes(element.Eg) && prefBudget === elementBudget){
          acc.push(element.Eg)
        }
      return acc;
    }, []);
    console.log('filteredFoodPlaces', filteredFoodPlaces)
    setFilteredFoodPlaces(filteredFoodPlaces)
    setFilteredActivityPlaces(filteredActivityPlaces)
  }, [activityPlaces, foodPlaces, preferences]);

  useEffect(() => {
    if (isLoaded) {
      handleSubmit(preferences);
    }
  }, [isLoaded]);

  return (
    <main className="itinerary-container">
      <h1 className="title">Journey Like a Genius</h1>
        <section className="itinerary-content">
          <div className="itinerary-details">
          <h4 className="itinerary-generated-message">Thank you for your information. A personalized itinerary has been generated to meet your needs.</h4>
            {filteredFoodPlaces.slice(0,1).map((item) => (
              <p><strong>{item.displayName}</strong><br /> 
                {item.formattedAddress}<br /> 
                Regular Hours: {item.regularOpeningHours.weekdayDescriptions}<br /> 
                {item.internationalPhoneNumber}
              </p>
                ))}
                {filteredActivityPlaces.slice(0,1).map((item) => (
                  <p><strong>{item.displayName}</strong><br /> 
                    {item.formattedAddress}<br /> 
                    Regular Hours: {item.regularOpeningHours.weekdayDescriptions}<br /> 
                    {item.internationalPhoneNumber}
              </p>
                ))}
                {filteredFoodPlaces.slice(1,2).map((item) => (
                  <p><strong>{item.displayName}</strong><br /> 
                    {item.formattedAddress}<br /> 
                    Regular Hours: {item.regularOpeningHours.weekdayDescriptions}<br /> 
                    {item.internationalPhoneNumber}
              </p>
                ))}
                {filteredActivityPlaces.slice(1,2).map((item) => (
                  <p><strong>{item.displayName}</strong><br /> 
                    {item.formattedAddress}<br /> 
                    Regular Hours: {item.regularOpeningHours.weekdayDescriptions}<br /> 
                    {item.internationalPhoneNumber}
              </p>
                ))}
            <button className="save-button">Save itinerary</button>
            <button className="try-again-button">Try another itinerary</button>
          </div>
        </section>
    </main>
  )
}

export default Itinerary;