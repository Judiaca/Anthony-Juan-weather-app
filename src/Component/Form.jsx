import React, { useState } from "react";
import { uid } from "uid";

//TODO:
const Form = ({ onAddActivity, styledComponent }) => {
  const [name, setName] = useState("");
  const [isForGoodWeather, setIsForGoodWeather] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim()) {
      const newId = uid(); // Generate a unique ID using uid
      onAddActivity({
        name: name,
        isForGoodWeather: isForGoodWeather,
        id: newId,
        category: selectedCategory,
      });
      setName("");
      setIsForGoodWeather(true);
      setSelectedCategory("All");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      // style={styledComponent.flexBoxStyles, }
      style={{
        width: "fit-content",
        // maxWidth: styledComponent.body,
        height: "fit-content",
        display: "flex",
        flexFlow: "column nowrap",
        borderRadius: "5px",
        backgroundColor: "#aaa",
        padding: "1rem",
      }}
    >
      <h2 style={styledComponent.subTitleStyles}>Add New Activity</h2>
      <label>
        Activity Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={30} // Set the maximum length to 30 characters
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
      <label>
        Category:
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </label>
      <button type="submit">Add Activity</button>
    </form>
  );
};

export default Form;
