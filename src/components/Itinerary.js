import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router";
import "./Itinerary.css";
import useGoogleMaps from "../hooks/useGoogleMaps";


const Itinerary = () => {
  const [activityPlaces, setActivityPlaces] = useState([]);  
  const [foodPlaces, setFoodPlaces] = useState([]);  
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useGoogleMaps(apiKey); 
  const [filteredFoodPlaces, setFilteredFoodPlaces] = useState([])
  const [filteredActivityPlaces, setFilteredActivityPlaces] = useState([])
  const [firstRandomFoodPlaces, setFirstRandomFoodPlaces] = useState([])
  const [firstRandomActivityPlaces, setFirstRandomActivityPlaces] = useState([])
  const [secondRandomFoodPlaces, setSecondRandomFoodPlaces] = useState([])
  const [secondRandomActivityPlaces, setSecondRandomActivityPlaces] = useState([])
  const  userId = useParams()
  const location = useLocation()
  const preferences = location.state

  const handleTryAgain = () => {
    resetItinerary();
  };

  const resetItinerary = () => {
    findActivityPlaces()
    findFoodPlaces()
  }

  const findActivityPlaces = useCallback(async () => {
    const { Place } = await window.google.maps.importLibrary("places");
    const activityRequest = {
      textQuery: `${preferences.activityType} in ${preferences.searchTerm}`,
      fields: ["displayName", "id", "accessibilityOptions", "allowsDogs", "formattedAddress", "isGoodForChildren", "isGoodForGroups", "priceLevel", "types", "regularOpeningHours", "internationalPhoneNumber"],
    };
    const { places } = await Place.searchByText(activityRequest);
    setActivityPlaces(places)
  }  , [preferences])

  const findFoodPlaces = useCallback(async () => {
    const { Place } = await window.google.maps.importLibrary("places");
    const foodRequest = {
      textQuery: `${preferences.foodType} food in ${preferences.searchTerm}`,
      fields: ["displayName", "id", "accessibilityOptions", "allowsDogs", "formattedAddress", "isGoodForChildren", "isGoodForGroups", "priceLevel", "types", "regularOpeningHours", "internationalPhoneNumber"],
    };
    const { places } = await Place.searchByText(foodRequest);
    setFoodPlaces(places)
  }, [preferences])

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
      findActivityPlaces(preferences)
      findFoodPlaces(preferences)
      }
  }, [isLoaded, preferences, findActivityPlaces, findFoodPlaces]);

  useEffect(() => {
    const firstRandomActivityArray = filteredActivityPlaces[Math.floor(Math.random() * filteredActivityPlaces.length)];
    const firstRandomFoodArray = filteredFoodPlaces[Math.floor(Math.random() * filteredFoodPlaces.length)];

    setFirstRandomActivityPlaces(firstRandomActivityArray);
    setFirstRandomFoodPlaces(firstRandomFoodArray);
  }, [filteredActivityPlaces, filteredFoodPlaces]);

  useEffect(() => {
    const secondRandomActivityArray = filteredActivityPlaces[Math.floor(Math.random() * filteredActivityPlaces.length)];
    const secondRandomFoodArray = filteredFoodPlaces[Math.floor(Math.random() * filteredFoodPlaces.length)];

    setSecondRandomActivityPlaces(secondRandomActivityArray);
    setSecondRandomFoodPlaces(secondRandomFoodArray);
  }, [filteredActivityPlaces, filteredFoodPlaces]);

  function saveItinerary() {
    const itineraryToSave = {
      city: preferences.searchTerm,
      duration: preferences.dayLength,
      items: [
        {
          name: firstRandomFoodPlaces.displayName,
          address: firstRandomFoodPlaces.formattedAddress,
          item_type: "resturant",
          opening_hours: firstRandomActivityPlaces.regularOpeningHours?.weekdayDescription,
          phone: firstRandomFoodPlaces.internationalPhoneNumber
        },
        {
          name: firstRandomActivityPlaces.displayName,
          address: firstRandomActivityPlaces.formattedAddress,
          item_type: "activity",
          opening_hours: firstRandomActivityPlaces.regularOpeningHours?.weekdayDescription,
          phone: firstRandomActivityPlaces.internationalPhoneNumber
        },
        ...(preferences.dayLength === "full-day"
           ? [
              {
                name: secondRandomFoodPlaces.displayName,
                address: secondRandomFoodPlaces.formattedAddress,
                item_type: "resturant",
                opening_hours: secondRandomActivityPlaces.regularOpeningHours?.weekdayDescription,
                phone: secondRandomFoodPlaces.internationalPhoneNumber
              },
              {
                name: secondRandomActivityPlaces.displayName,
                address: secondRandomActivityPlaces.formattedAddress,
                item_type: "activity",
                opening_hours: secondRandomActivityPlaces.regularOpeningHours?.weekdayDescription,
                phone: secondRandomActivityPlaces.internationalPhoneNumber
              },
            ]
        : [] )
      ]
    }   
    console.log("what is being sent? ", JSON.stringify({ itinerary: itineraryToSave }))
    fetch(`https://enigmatic-harbor-21766-4fbcc08ecd57.herokuapp.com/api/v1/itineraries/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify( {itinerary: itineraryToSave} ),
      
    }).then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .catch(error => console.log(error))
  }

  return (
    <main className="itinerary-container">
      <h1 className="title">Journey Like a Genius</h1>
        <section className="itinerary-content">
          <div className="itinerary-details">
          <h4 className="itinerary-generated-message">Thank you for your information. A personalized itinerary has been generated to meet your needs.</h4>
          {(filteredFoodPlaces.length <= 1 || filteredActivityPlaces.length <= 1) ? (
            <p><strong>May be unable to display full itinerary with selected preferences</strong></p>
            ) : null}
              {firstRandomFoodPlaces && (
              <p><strong>{firstRandomFoodPlaces.displayName}</strong><br /> 
                {firstRandomFoodPlaces.formattedAddress}<br /> 
                Regular Hours: {firstRandomFoodPlaces.regularOpeningHours?.weekdayDescriptions}<br /> 
                {firstRandomFoodPlaces.internationalPhoneNumber}
              </p>
              )}
              {firstRandomActivityPlaces && (
              <p><strong>{firstRandomActivityPlaces.displayName}</strong><br /> 
                {firstRandomActivityPlaces.formattedAddress}<br /> 
                Regular Hours: {firstRandomActivityPlaces.regularOpeningHours?.weekdayDescriptions}<br /> 
                {firstRandomActivityPlaces.internationalPhoneNumber}
              </p>
              )}
                  {preferences.dayLength === "full-day" ? (
                    secondRandomFoodPlaces && (
                      <p><strong>{secondRandomFoodPlaces.displayName}</strong><br /> 
                        {secondRandomFoodPlaces.formattedAddress}<br /> 
                        Regular Hours: {secondRandomFoodPlaces.regularOpeningHours?.weekdayDescriptions}<br /> 
                        {secondRandomFoodPlaces.internationalPhoneNumber}
                      </p>
                )
                  ) : null}
                  {preferences.dayLength === "full-day" ? (
                    secondRandomActivityPlaces && (
                      <p><strong>{secondRandomActivityPlaces.displayName}</strong><br /> 
                        {secondRandomActivityPlaces.formattedAddress}<br /> 
                        Regular Hours: {secondRandomActivityPlaces.regularOpeningHours?.weekdayDescriptions}<br /> 
                        {secondRandomActivityPlaces.internationalPhoneNumber}
                      </p>
                )
                  ) : null}
            <button className="save-button" onClick={saveItinerary}>Save itinerary</button>
            <button className="try-again-button" onClick={handleTryAgain}>Try another itinerary</button>
          </div>
        </section>
    </main>
  )
}

export default Itinerary;