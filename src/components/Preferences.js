import React, { useEffect, useState, useRef} from "react";
import { Link } from "react-router-dom"
import "./Preferences.css";


const Preferences = () => {
  const [preferences, setPreferences] = useState({})
  const [searchTerm, setSearch] = useState('')
  const [dayLength, setDayLength] = useState('')
  const [activityType, setActivityType] = useState('')
  const [budget, setBudget] = useState('')
  const [accessibility, setAccessibility] = useState('')
  const [group, setGroup] = useState('')
  const [foodType, setFoodType] = useState('')
  const [allowsDogs, setAllowsDogs] = useState('')


  useEffect(() => {
    setPreferences({
      searchTerm,
      dayLength,
      activityType,
      budget,
      accessibility,
      group,
      foodType,
      allowsDogs,
    })
  }, [searchTerm, dayLength, activityType, budget, accessibility, group, foodType])

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
            <label for="nature">Nature</label>
            <input type="radio" id="culture" name="activity-type" value="culture" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="culture">Culture</label>
            <input type="radio" id="museum" name="activity-type" value="museum" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="museum">Museum</label>
            <input type="radio" id="sightseeing" name="activity-type" value="sightseeing" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="sightseeing">Sightseeing</label>
            <input type="radio" id="shoping" name="activity-type" value="shopping" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="shopping">Shopping</label>
          </article>
        </section>
        <section className="budget">
          <h3> What type of budget are you looking to stay within? </h3>
          <article>
            {/* <input type="radio" id="inexpensive" name="budget-type" value="inexpensive" 
            onChange={(event) => setBudget(event.target.value)}/>
            <label for="inexpensive">$</label> */}
            <input type="radio" id="moderate" name="budget-type" value="moderate" 
            onChange={(event) => setBudget(event.target.value)}/>
            <label for="moderate">$$</label>
            <input type="radio" id="expensive" name="budget-type" value="expensive" 
            onChange={(event) => setBudget(event.target.value)}/>
            <label for="expensive">$$$</label>
            {/* <input type="radio" id="veryExpensive" name="budget-type" value="veryExpensive" 
            onChange={(event) => setBudget(event.target.value)}/>
            <label for="veryExpensive">$$$$</label> */}
          </article>
        </section>
        <section className="accessibility">
          <h3> Would you like accessibility options? </h3>
          <article>
            <input type="radio" id="yes" name="accessibility" value="true" 
            onChange={(event) => setAccessibility(event.target.value)}/>
            <label for="yes">Yes</label>
            <input type="radio" id="no" name="accessibility" value="false" 
            onChange={(event) => setAccessibility(event.target.value)}/>
            <label for="no">No</label>
          </article>
        </section>
        <section className="group">
          <h3> What does your travel party look like? </h3>
          <article>
            <input type="radio" id="single" name="group-size" value="false" 
            onChange={(event) => setGroup(event.target.value)}/>
            <label for="single">Just me</label>
            <input type="radio" id="couple" name="group-size" value="false" 
            onChange={(event) => setGroup(event.target.value)}/>
            <label for="small-group">Myself + a few</label>
            <input type="radio" id="group" name="group-size" value="true" 
            onChange={(event) => setGroup(event.target.value)}/>
            <label for="group">Myself + 6 or more</label>
            <input type="radio" id="furryFriends" name="group-size" value="true" 
            onChange={(event) => {setAllowsDogs(event.target.value); setGroup("false");}}/>
            <label for="furryFriends">Traveling with a furry companion</label>
          </article>
        </section>
        <section className="food">
          <h3> What type of food do you like? </h3>
          <article>
            <input type="radio" id="african" name="food-type" value="african" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="african">African</label>
            <input type="radio" id="american" name="food-type" value="american" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="american">American</label>
            <input type="radio" id="bbq" name="food-type" value="bbq" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="bbq">BBQ</label>
            <input type="radio" id="cafe" name="food-type" value="cafe" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="cafe">Cafe</label>
            <input type="radio" id="caribbean" name="food-type" value="caribbean" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="caribbean">Caribbean</label>
            <input type="radio" id="chinese" name="food-type" value="chinese" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="chinese">Chinese</label>
            <input type="radio" id="french" name="food-type" value="french" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="french">French</label>
            <input type="radio" id="italian" name="food-type" value="italian" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="italian">Italian</label>
            <input type="radio" id="japanese" name="food-type" value="japanese" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="japanese">Japanese</label>
            <input type="radio" id="korean" name="food-type" value="korean" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="korean">Korean</label>
            <input type="radio" id="mexican" name="food-type" value="mexican" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="mexican">Mexican</label>
            <input type="radio" id="seafood" name="food-type" value="seafood" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="seafood">Seafood</label>
            <input type="radio" id="south american" name="food-type" value="south american" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="south american">South American</label>
            <input type="radio" id="thai" name="food-type" value="thai" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="thai">Thai</label>
            <input type="radio" id="vegan" name="food-type" value="vegan" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="vegan">Vegan</label>
            <input type="radio" id="vegetarian" name="food-type" value="vegeterian" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="vegetarian">Vegetarian</label>
            <input type="radio" id="vietnamese" name="food-type" value="vietnamese" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="vietnamese">Vietnamese</label>
          </article>
        </section>
        <Link to={`/itinerary/:user_id`} state={preferences} >
          <button className="submit-button">Submit Your Preferences</button>
        </Link>
      </form>
    </main>
  );
};

export default Preferences;
