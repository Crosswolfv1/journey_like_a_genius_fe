import React from "react";
import "./Homepage.css";
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
  <main>
    <header>  
      <h1> Journey Like a Genius </h1>
    </header>
    <section>
        <h2>
          We're excited to get started on your personalized travel itinerary.
        </h2>
        <p>
          We'll ask a series of questions to better understand you lifestyle,
          preferences, and unique needs so we can generate a perfect travel day.
        </p>
        <Link to={'/preferences'}>
        <button>Let's get started </button>
        </Link>
      </section>
    </main>
  );
};

export default Homepage;
