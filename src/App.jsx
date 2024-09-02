{
  /**
// NOTE: We disabled the prop-types error in 

eslint.config.js :
rules: {
 "react/prop-types": "off", //Or: "error" || "warn"
},

*/
}
import React, { useState, useEffect } from "react";
import { uid } from "uid";
import { mockData, uiWeatherConditionText } from "./assets/mockData";
import { fetchData } from "./helpers/helpers.js";

import Form from "./Component/Form";
import List from "./Component/List";

import "./App.css";

const App = () => {
  const [activities, setActivities] = useState(
    JSON.parse(localStorage.getItem("activities")) || mockData
  );
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [weather, setWeather] = useState({});
  const url = "https://example-apis.vercel.app/api/weather/sahara";

  useEffect(() => {
    setActivities(JSON.parse(localStorage.getItem("activities")) || mockData);
    // read data from API when component mounted
    fetchData(url, setWeather);

    const tempArrary = handleFilterActivities();
    setActivities(tempArrary);
    // setFilteredActivities(tempArrary);

    // read from localStorage when component mounted
    // const storedActivities =
    //   JSON.parse(localStorage.getItem("activities")) || [];
    // setActivities(storedActivities);
  }, []);

  useEffect(() => {
    console.log(activities?.length);
    if (activities?.length > 0) {
      localStorage.setItem("activities", JSON.stringify(activities));
    } else {
      localStorage.removeItem("activities");
    }
    setFilteredActivities(handleFilterActivities());
  }, [activities]);

  const handleAddActivity = (activity) => {
    setActivities([...activities, activity]);
    // setFilteredActivities(activities);
  };

  const handleFilterActivities = () => {
    const updatedArray = activities.filter(
      (activity) => activity.isForGoodWeather === weather.isGoodWeather
    );
    return updatedArray;
  };

  // const handleDeleteActivity = (id) => {
  //   const updatedArray = activities.filter((activity) => activity.id !== id);
  //   setActivities(updatedArray);
  // };

  const handleDeleteActivity = (id) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(updatedActivities);

    // Update filteredActivities after deleting from activities
    setFilteredActivities(handleFilterActivities());
  };

  //TODO: Toggle UI to Good/Bad Weather activity
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
        }}
      >
        <p>{weather.condition}</p>
        <p>{weather.temperature}°</p>
      </div>
      <p>
        {weather.isGoodWeather
          ? uiWeatherConditionText.isGood
          : uiWeatherConditionText.isBad}
      </p>
      <Form onAddActivity={handleAddActivity} />
      <List
        // activities={filteredActivities}
        activities={activities}
        isGoodWeather={weather.isGoodWeather}
        onDeleteActivity={handleDeleteActivity}
      />

      <div style={{ backgroundColor: "#22222280", marginTop: "5rem" }}>
        {JSON.stringify(weather)}
        <button onClick={() => localStorage.removeItem("activities")}>
          delete LS
        </button>
      </div>
    </div>
  );
};

export default App;
