import React, { useState } from "react";

function Form({ onAddActivity }) {
  // States for form fields
  const [name, setName] = useState("");
  const [isForGoodWeather, setIsForGoodWeather] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new activity object
    const newActivity = {
      name,
      isForGoodWeather,
    };

    // Call the passed-in function from props
    onAddActivity(newActivity);

    // Reset form fields
    setName("");
    setIsForGoodWeather(false);

    // Focus the first input field
    document.getElementById("activity-name").focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Activity</h2>
      <div>
        <label htmlFor="activity-name">Activity Name:</label>
        <input
          id="activity-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="good-weather">Good Weather Activity:</label>
        <input
          id="good-weather"
          type="checkbox"
          checked={isForGoodWeather}
          onChange={(e) => setIsForGoodWeather(e.target.checked)}
        />
      </div>
      <button type="submit">Add Activity</button>
    </form>
  );
}

export default Form;
