import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Preferences.css";

const Preferences = () => {
  const [preferences, setPreferences] = useState({});
  const [searchTerm, setSearch] = useState('');
  const [dayLength, setDayLength] = useState('');
  const [activityType, setActivityType] = useState('');
  const [budget, setBudget] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [group, setGroup] = useState('');
  const [foodType, setFoodType] = useState('');
  const [allowsDogs, setAllowsDogs] = useState('');
  const [errors, setErrors] = useState([]);
  const userId = useParams();
  const navigate = useNavigate();

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
    });
  }, [searchTerm, dayLength, activityType, budget, accessibility, group, foodType, allowsDogs]);

  const validateForm = () => {
    const errorMessages = [];

    if (!searchTerm) {
      errorMessages.push("Please enter a city.");
    }
    if (!dayLength) {
      errorMessages.push("Please select a day length.");
    }
    if (!activityType) {
      errorMessages.push("Please select an activity type.");
    }
    if (!budget) {
      errorMessages.push("Please select a budget.");
    }
    if (!accessibility) {
      errorMessages.push("Please select accessibility options.");
    }
    if (!group) {
      errorMessages.push("Please select your group size.");
    }
    if (!foodType) {
      errorMessages.push("Please select a food type.");
    }

    setErrors(errorMessages);
    return errorMessages.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      navigate(`/itinerary/${userId.userId}`, { state: preferences });
    }
  };

  return (
    <main className="preferences-container">
      <h2>Please make your selections</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">

        <section className="city-input-section">
          <h3>What City Are You In?</h3>
          <input
            type="text"
            id="city"
            placeholder="Enter a city"
            className="city-input"
            onChange={(event) => setSearch(event.target.value)}
          />
        </section>

        <section className="length-of-day">
          <h3>Would you prefer a half day or full day itinerary?</h3>
          <article>
            <input type="radio" id="half-day" name="day-length" className="half-day" value="half-day" 
            onChange={(event) => setDayLength(event.target.value)}/>
            <label for="half-day">Half Day</label>
            <input type="radio" id="full-day" name="day-length" className="full-day" value="full-day" 
            onChange={(event) => setDayLength(event.target.value)}/>
            <label for="full-day">Full Day</label>
          </article>
        </section>

        <section className="activity">
          <h3>What type of activity are you looking to do?</h3>
          <article>
            <input type="radio" id="nature" name="activity-type" className="nature" value="nature" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="nature">Nature</label>
            <input type="radio" id="culture" name="activity-type" className="culture" value="culture" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="culture">Culture</label>
            <input type="radio" id="museum" name="activity-type" className="museum" value="museum" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="museum">Museum</label>
            <input type="radio" id="sightseeing" name="activity-type" className="sightseeing" value="sightseeing" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="sightseeing">Sightseeing</label>
            <input type="radio" id="shopping" name="activity-type" className="shopping" value="shopping" 
            onChange={(event) => setActivityType(event.target.value)}/>
            <label for="shopping">Shopping</label>
          </article>
        </section>

        <section className="budget">
          <h3>What type of budget are you looking to stay within?</h3>
          <article>
            <input type="radio" id="moderate" name="budget-type" className="moderate" value="moderate" 
            onChange={(event) => setBudget(event.target.value)}/>
            <label for="moderate">$$</label>
            <input type="radio" id="expensive" name="budget-type" className="expensive" value="expensive" 
            onChange={(event) => setBudget(event.target.value)}/>
            <label for="expensive">$$$</label>
          </article>
        </section>

        <section className="accessibility">
          <h3>Would you like accessibility options?</h3>
          <article>
            <input type="radio" id="yes" name="accessibility" className="access-true" value="true" 
            onChange={(event) => setAccessibility(event.target.value)}/>
            <label for="yes">Yes</label>
            <input type="radio" id="no" name="accessibility" className="access-false" value="false" 
            onChange={(event) => setAccessibility(event.target.value)}/>
            <label for="no">No</label>
          </article>
        </section>

        <section className="group">
          <h3>What does your travel party look like?</h3>
          <article>
            <input type="radio" id="single" name="group-size" className="single" value="false" 
            onChange={(event) => setGroup(event.target.value)}/>
            <label for="single">Just me</label>
            <input type="radio" id="small-group" name="group-size" className="small-group" value="false" 
            onChange={(event) => setGroup(event.target.value)}/>
            <label for="small-group">Myself + a few</label>
            <input type="radio" id="group" name="group-size" className="group" value="true" 
            onChange={(event) => setGroup(event.target.value)}/>
            <label for="group">Myself + 6 or more</label>
            <input type="radio" id="furry-friends" name="group-size" className="furry-friends" value="true" 
            onChange={(event) => {setAllowsDogs(event.target.value); setGroup("false");}}/>
            <label for="furryFriends">Traveling with a furry companion</label>
          </article>
        </section>

        <section className="food">
          <h3>What type of food do you like?</h3>
          <article>
            <input type="radio" id="african" name="food-type" className="african" value="african" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="african">African</label>
            <input type="radio" id="american" name="food-type" className="american" value="american" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="american">American</label>
            <input type="radio" id="bbq" name="food-type" className="bbq" value="bbq" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="bbq">BBQ</label>
            <input type="radio" id="cafe" name="food-type" className="cafe" value="cafe" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="cafe">Cafe</label>
            <input type="radio" id="caribbean" name="food-type" className="caribbean" value="caribbean" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="caribbean">Caribbean</label>
            <input type="radio" id="chinese" name="food-type" className="chinese" value="chinese" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="chinese">Chinese</label>
            <input type="radio" id="french" name="food-type" className="french" value="french" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="french">French</label>
            <input type="radio" id="italian" name="food-type" className="italian" value="italian" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="italian">Italian</label>
            <input type="radio" id="japanese" name="food-type" className="japanese" value="japanese" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="japanese">Japanese</label>
            <input type="radio" id="korean" name="food-type" className="korean" value="korean" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="korean">Korean</label>
            <input type="radio" id="mexican" name="food-type" className="mexican" value="mexican" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="mexican">Mexican</label>
            <input type="radio" id="seafood" name="food-type" className="seafood" value="seafood" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="seafood">Seafood</label>
            <input type="radio" id="south american" name="food-type" className="south-american" value="south american" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="south american">South American</label>
            <input type="radio" id="thai" name="food-type" className="thai" value="thai" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="thai">Thai</label>
            <input type="radio" id="vegan" name="food-type" className="vegan" value="vegan" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="vegan">Vegan</label>
            <input type="radio" id="vegetarian" name="food-type" className="vegetarian" value="vegetarian" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="vegetarian">Vegetarian</label>
            <input type="radio" id="vietnamese" name="food-type" className="vietnamese" value="vietnamese" 
            onChange={(event) => setFoodType(event.target.value)}/>
            <label for="vietnamese">Vietnamese</label>
          </article>
        </section>
        </div>

        {errors.length > 0 && (
          <div className="error-messages">
            <h4>Please fix the following errors:</h4>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <button 
          className="submit-button" 
          type="submit"
        >
          Submit Your Preferences
        </button>
      </form>
    </main>
  );
};

export default Preferences;