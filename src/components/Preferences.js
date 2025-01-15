import React, { useEffect, useState, useRef } from "react";
import "./Preferences.css";
import useGoogleMaps from "../hooks/useGoogleMaps";


  const Preferences = () => {
  const [showPreferences] = useState(false)

    const [preferences, setPreferences] = useState({})
    const [searchTerm, setSearch] = useState('')
    const [dayLength, setDayLength] = useState('')
    const [activityType, setActivityType] = useState('')
    const [budget, setBudget] = useState('')
    const [accessibility, setAccessibility] = useState('')
    const [groupSize, setGroupSize] = useState('')
    const [foodType, setFoodType] = useState('')
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const { isLoaded, error } = useGoogleMaps(apiKey); 
    const mapRef = useRef(null);
    const [activityPlaces, setActivityPlaces] = useState([]);  
    const [foodPlaces, setFoodPlaces] = useState([]);  


    async function findPlaces() {
      const { Place } = await window.google.maps.importLibrary("places");
      const activityRequest = {
        textQuery: `${preferences.activityType} in ${preferences.searchTerm}`,
        fields: ["displayName", "id", "accessibilityOptions", "allowsDogs", "formattedAddress", "isGoodForChildren", "isGoodForGroups", "priceLevel", "types", "regularOpeningHours", "internationalPhoneNumber"],
      };
      const { places } = await Place.searchByText(activityRequest);
      setActivityPlaces(places)
    }  
  
    useEffect(() => {
      activityPlaces.forEach(element => {
        console.log("Updated activityPlaces:", element.Eg);
      })
    }, [activityPlaces]);

    useEffect(() => {
      setPreferences({
        searchTerm,
        dayLength,
        activityType,
        budget,
        accessibility,
        groupSize,
        foodType,
      })
    }, [searchTerm, dayLength, activityType, budget, accessibility, groupSize, foodType])
  
    const handleSubmit = (event) => {
      event.preventDefault()
      findPlaces(preferences)
      console.log('Preferences to pass to API:', preferences)
    }

  return (
    <main className="preferences-container">
      <h2> Please make your selections </h2>
      <form>
        <section className="city-input-section">
          <h3>What City Are You In?</h3>
          <input
            type="text"
            id="city"
            placeholder="Enter a city"
            className="city-input"
            onChange={(event) => {setSearch(event.target.value)}}
          />
        </section>
        <section className="length-of-day">
          <h3> Would you prefer a half day or full day itinerary? </h3>
          <article>
            <input type="radio" id="half-day" name="day-length" value="half-day" 
            onChange={(event) => setDayLength(event.target.value)}/>
            <label for="half-day">Half Day</label>
            <input type="radio" id="full-day" name="day-length" value="full-day" 
            onChange={(event) => setDayLength(event.target.value)}/>
            <label for="full-day">Full Day</label>
          </article>
        </section>
        <section className="activity">
          <h3> What type of activity are you looking to do? </h3>
          <article>
            <input type="radio" id="nature" name="activity-type" value="nature" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="nature">Naturey</label>
            <input type="radio" id="culture" name="activity-type" value="culture" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="culture">Culture</label>
            <input type="radio" id="shoping" name="activity-type" value="shopping" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="shopping">Shopping</label>
          </article>
        </section>
        <section className="budget">
          <h3> What type of budget are you looking to stay within? </h3>
          <article>
            <input type="radio" id="inexpensive" name="budget-type" value="inexpensive" 
            onChange={(event) => setBudget(event.target.value)}/>
            <label for="inexpensive">$</label>
            <input type="radio" id="moderate" name="budget-type" value="moderate" 
            onChange={(event) => setBudget(event.target.value)}/>
            <label for="moderate">$$</label>
            <input type="radio" id="expensive" name="budget-type" value="expensive" 
            onChange={(event) => setBudget(event.target.value)}/>
            <label for="expensive">$$$</label>
            <input type="radio" id="veryExpensive" name="budget-type" value="veryExpensive" 
            onChange={(event) => setBudget(event.target.value)}/>
            <label for="veryExpensive">$$$$</label>
          </article>
        </section>
        <section className="accessibility">
          <h3> Would you like accessibility options? </h3>
          <article>
            <input type="radio" id="yes" name="accessibility" value="yes" 
            onChange={(event) => setAccessibility(event.target.value)}/>
            <label for="yes">Yes</label>
            <input type="radio" id="no" name="accessibility" value="no" 
            onChange={(event) => setAccessibility(event.target.value)}/>
            <label for="no">No</label>
          </article>
        </section>
        <section className="groupSize">
          <h3> What does your travel party look like? </h3>
          <article>
            <input type="radio" id="single" name="group-size" value="single" 
            onChange={(event) => setGroupSize(event.target.value)}/>
            <label for="single">Just me</label>
            <input type="radio" id="couple" name="group-size" value="couple" 
            onChange={(event) => setGroupSize(event.target.value)}/>
            <label for="couple">Me + 1</label>
            <input type="radio" id="group" name="group-size" value="group" 
            onChange={(event) => setGroupSize(event.target.value)}/>
            <label for="group">Me + 3 or more</label>
            <input type="radio" id="furryFriends" name="group-size" value="furryFriends" 
            onChange={(event) => setGroupSize(event.target.value)}/>
            <label for="furryFriends">Traveling with a furry companion</label>
          </article>
        </section>
        <section className="food">
          <h3> What type of food do you like? </h3>
          <article>
            <input type="radio" id="asian" name="food-type" value="asian" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="asian">Asian</label>
            <input type="radio" id="seafood" name="food-type" value="seafood" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="seafood">Seafood</label>
            <input type="radio" id="vegan" name="food-type" value="vegan" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="vegan">Vegan</label>
            <input type="radio" id="vegatarian" name="food-type" value="vegatarian" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="vegatarian">Vegatarian</label>
            <input type="radio" id="italian" name="food-type" value="italian" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="italian">Italian</label>
            <input type="radio" id="bbq" name="food-type" value="bbq" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="bbq">Bbq</label>
          </article>
        </section>
        <button type="submit" className="submit-button" onClick={handleSubmit}>
        Submit Your Preferences
      </button>
      </form>
    </main>
  );
};

export default Preferences;
