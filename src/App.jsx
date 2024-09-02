import React, { useState, useEffect } from "react";
import Form from "./Component/Form";
import List from "./Component/List";
import { uid } from "uid";
import "./App.css";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [isGoodWeather, setIsGoodWeather] = useState(true);

  useEffect(() => {
    const storedActivities =
      JSON.parse(localStorage.getItem("activities")) || [];
    setActivities(storedActivities);
  }, []);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const handleAddActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

  return (
    <div>
      <Form onAddActivity={handleAddActivity} />
      <List activities={filteredActivities} isGoodWeather={isGoodWeather} />
    </div>
  );
};

export default App;
