import React from "react";
import "./Preferences.css";

const Preferences = () => {
  return (
    <main className="preferences-container">
      <h2> Please make your selections </h2>
      <form>
        <section className="length-of-day">
          <h3> Would you prefer a half day or full day itinerary? </h3>
          <article>
            <input type="radio" id="half-day" name="day-length" value="half-day" />
            <label for="half-day">Half Day</label>
            <input type="radio" id="full-day" name="day-length" value="full-day" />
            <label for="full-day">Full Day</label>
          </article>
        </section>
        <section className="activity">
          <h3> What type of activity are you looking to do? </h3>
          <article>
            <input type="radio" id="nature" name="activity-type" value="nature" />
            <label for="nature">Naturey</label>
            <input type="radio" id="culture" name="activity-type" value="culture" />
            <label for="culture">Culture</label>
            <input type="radio" id="shoping" name="activity-type" value="shopping" />
            <label for="shopping">Shopping</label>
          </article>
        </section>
        <section className="budget">
          <h3> What type of budget are you looking to stay within? </h3>
          <article>
            <input type="radio" id="inexpensive" name="budget-type" value="inexpensive" />
            <label for="inexpensive">$</label>
            <input type="radio" id="moderate" name="budget-type" value="moderate" />
            <label for="moderate">$$</label>
            <input type="radio" id="expensive" name="budget-type" value="expensive" />
            <label for="expensive">$$$</label>
            <input type="radio" id="veryExpensive" name="budget-type" value="veryExpensive" />
            <label for="veryExpensive">$$$$</label>
          </article>
        </section>
        <section className="accessibility">
          <h3> Would you like accessibility options? </h3>
          <article>
            <input type="radio" id="yes" name="accessibility" value="yes" />
            <label for="yes">Yes</label>
            <input type="radio" id="no" name="accessibility" value="no" />
            <label for="no">No</label>
          </article>
        </section>
        <section className="budget">
          <h3> What does your travel party look like? </h3>
          <article>
            <input type="radio" id="single" name="group-size" value="single" />
            <label for="single">Just me</label>
            <input type="radio" id="couple" name="group-size" value="couple" />
            <label for="couple">Me + 1</label>
            <input type="radio" id="group" name="group-size" value="group" />
            <label for="group">Me + 3 or more</label>
            <input type="radio" id="furryFriends" name="group-size" value="furryFriends" />
            <label for="furryFriends">Traveling with a furry companion</label>
          </article>
        </section>
        <section className="budget">
          <h3> What type of food do you like? </h3>
          <article>
            <input type="radio" id="asian" name="food-type" value="asian" />
            <label for="asian">Asian</label>
            <input type="radio" id="seafood" name="food-type" value="seafood" />
            <label for="seafood">Seafood</label>
            <input type="radio" id="vegan" name="food-type" value="vegan" />
            <label for="vegan">Vegan</label>
            <input type="radio" id="vegatarian" name="food-type" value="vegatarian" />
            <label for="vegatarian">Vegatarian</label>
            <input type="radio" id="italian" name="food-type" value="italian" />
            <label for="italian">Italian</label>
            <input type="radio" id="bbq" name="food-type" value="bbq" />
            <label for="bbq">Bbq</label>
          </article>
        </section>
        <button type="submit" className="submit-button">
        Submit Your Preferences
      </button>
      </form>
    </main>
  );
};

export default Preferences;
