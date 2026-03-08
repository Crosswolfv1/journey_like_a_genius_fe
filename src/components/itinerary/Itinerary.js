import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router";
import "./Itinerary.css";
import useGoogleMaps from "../../hooks/useGoogleMaps";
import { Link } from "react-router-dom"


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
  const [status, setStatus] = useState(false)
  const  userId = useParams()
  const location = useLocation()
  const preferences = location.state

  const handleTryAgain = () => {
    resetItinerary();
  };

  const resetItinerary = () => {
    setFirstRandomFoodPlaces(null)
    setFirstRandomActivityPlaces(null)
    setSecondRandomFoodPlaces(null)
    setSecondRandomActivityPlaces(null)
    setStatus(false)

    setFilteredFoodPlaces([]);
    setFilteredActivityPlaces([]);

    setTimeout(() => {
      findActivityPlaces();
      findFoodPlaces();
    }, 100)
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
      const elementGroup = element.Hi?.isGoodForGroups?.toString() || '';
      const prefDog = preferences.allowsDogs?.toString() || '';
      const elementDog = element.Hi?.allowsDogs?.toString() || '';
      const prefAccess = preferences.accessibility?.toString() || '';
      const elementAccess = element.Hi?.accessibilityOptions?.hasWheelchairAccessibleEntrance?.toString() || '';

        if (prefGroup === elementGroup){
          groupArray.push(element.Hi)
        } else if (prefGroup === "false") {
          groupArray.push(element.Hi)
        }
        if (groupArray.includes(element.Hi) && prefAccess === elementAccess){
          accessArray.push(element.Hi)
        } else if (groupArray.includes(element.Hi) && prefAccess === "false") {
          accessArray.push(element.Hi)
        }
        if (accessArray.includes(element.Hi) && prefDog === elementDog){
          acc.push(element.Hi)
        } else if (accessArray.includes(element.Hi) && prefDog === "false") {
          acc.push(element.Hi)
        }
      return acc;
    }, []);

    const foodGroupArray = []
    const doosAccessArray = []
    const foodDogArray = []

    const filteredFoodPlaces = foodPlaces.reduce((acc, element) => {

      const prefGroup = preferences.group?.toString() || '';
      const elementGroup = element.Hi?.isGoodForGroups?.toString() || '';
      const prefBudget = preferences.budget?.toString() || '';
      const elementBudget = element.Hi?.priceLevel?.toString().toLowerCase() || '';
      const prefDog = preferences.allowsDogs?.toString() || '';
      const elementDog = element.Hi?.allowsDogs?.toString() || '';
      const prefAccess = preferences.accessibility?.toString() || '';
      const elementAccess = element.Hi?.accessibilityOptions?.hasWheelchairAccessibleEntrance?.toString() || '';

        if (prefGroup === elementGroup){
          foodGroupArray.push(element.Hi)
        } else if (prefGroup === "false") {
          foodGroupArray.push(element.Hi)
        }
        if (foodGroupArray.includes(element.Hi) && prefAccess === elementAccess){
          doosAccessArray.push(element.Hi)
        } else if (foodGroupArray.includes(element.Hi) && prefAccess === "false") {
          doosAccessArray.push(element.Hi)
        }
        if (doosAccessArray.includes(element.Hi) && prefDog === elementDog){
          foodDogArray.push(element.Hi)
        } else if (accessArray.includes(element.Hi) && prefDog === "false") {
          foodDogArray.push(element.Hi)
        }
        if (foodDogArray.includes(element.Hi) && prefBudget === elementBudget){
          acc.push(element.Hi)
        }
      return acc;
    }, []);
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
    console.log('first random activity', firstRandomActivityArray)
    console.log('first random food', firstRandomFoodArray)
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
    fetch('http://localhost:3001/api/v1/itineraries/1', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify( {itinerary: itineraryToSave} ),
      
    }).then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        setStatus(true)
        return response.json()
      })
      .catch(error => console.log(error))
  }

  return (
    <main className="itinerary-container">
      <h1 className="itinerary-title">Journey Like a Genius</h1>
        <section className="itinerary-content">
          <div className="itinerary-details">
          <h4 className="itinerary-generated-message">Thank you for your information. A personalized itinerary has been generated to meet your needs.</h4>
          {(filteredFoodPlaces.length <= 1 || filteredActivityPlaces.length <= 1) ? (
            <p key="warning"><strong>May be unable to display full itinerary with selected preferences</strong></p>
            ) : null}
          {firstRandomFoodPlaces ? (
            <p key="restaurant1">
              <strong>{firstRandomFoodPlaces.displayName}</strong><br />
              {firstRandomFoodPlaces.formattedAddress}<br />
              RqEular Hours: {firstRandomFoodPlaces.regularOpeningHours?.weekdayDescriptions}<br />
              {firstRandomFoodPlaces.internationalPhoneNumber}
            </p>
          ) : null}

          {firstRandomActivityPlaces ? (
            <p key="activity1">
              <strong>{firstRandomActivityPlaces.displayName}</strong><br />
              {firstRandomActivityPlaces.formattedAddress}<br />
              RqEular Hours: {firstRandomActivityPlaces.regularOpeningHours?.weekdayDescriptions}<br />
              {firstRandomActivityPlaces.internationalPhoneNumber}
            </p>
          ) : null}

          {preferences.dayLength === "full-day" && secondRandomFoodPlaces ? (
            <p key="restaurant2">
              <strong>{secondRandomFoodPlaces.displayName}</strong><br />
              {secondRandomFoodPlaces.formattedAddress}<br />
              RqEular Hours: {secondRandomFoodPlaces.regularOpeningHours?.weekdayDescriptions}<br />
              {secondRandomFoodPlaces.internationalPhoneNumber}
            </p>
          ) : null}

          {preferences.dayLength === "full-day" && secondRandomActivityPlaces ? (
            <p key="activity2">
              <strong>{secondRandomActivityPlaces.displayName}</strong><br />
              {secondRandomActivityPlaces.formattedAddress}<br />
              RqEular Hours: {secondRandomActivityPlaces.regularOpeningHours?.weekdayDescriptions}<br />
              {secondRandomActivityPlaces.internationalPhoneNumber}
            </p>
          ) : null}
            <div className="btn-container">
            {(status) ? (
            <p className="saved-message" key="saved"><strong>Saved Itinerary</strong></p>
            ) : null}
            <button className="try-again-button" onClick={handleTryAgain}>Try another itinerary</button>
              <button className="save-button" onClick={saveItinerary}>Save itinerary</button>
              <Link to={`/${userId.userId}`}>
                <button className="return-home">Back to home</button>
              </Link>
            </div>
          </div>
        </section>
    </main>
  )
}

export default Itinerary;