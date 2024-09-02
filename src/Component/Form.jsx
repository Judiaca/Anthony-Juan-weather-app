import React, { useState } from "react";

//TODO:
const Form = ({ onAddActivity }) => {
  const [name, setName] = useState("");
  const [isForGoodWeather, setIsForGoodWeather] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim()) {
      onAddActivity({
        name: name,
        isForGoodWeather: isForGoodWeather,
        id: crypto.randomUUID(),
      });
      setName("");
      setIsForGoodWeather(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Activity</h2>
      <label>
        Activity Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={isForGoodWeather}
          onChange={(e) => setIsForGoodWeather(e.target.checked)}
        />
        Good Weather Activity
      </label>
      <button type="submit">Add Activity</button>
    </form>
  );
};

export default Form;
