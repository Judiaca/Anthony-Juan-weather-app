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
import SelectRegion from "./Component/SelectRegion";
import Header from "./Component/Header";
import { styledComponent } from "./theme.js";

import "./App.css";

const App = () => {
  const [activities, setActivities] = useState(
    JSON.parse(localStorage.getItem("activities")) || mockData
  );

  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState(
    "https://example-apis.vercel.app/api/weather/europe"
  );
  const [weather, setWeather] = useState({});
  const selectedLocationString = selectedLocation.replace(
    "https://example-apis.vercel.app/api/weather/",
    ""
  );
  //useEffect(() => {
  // read data from API when component mounted
  useEffect(() => {
    fetchData(selectedLocation, setWeather);

    const intervalId = setInterval(() => {
      fetchData(selectedLocation, setWeather);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedLocation]);
  useEffect(() => {
    const tempArrary = handleFilterActivities();
    setFilteredActivities(tempArrary);
  }, [weather, activities, selectedCategory]);

  useEffect(() => {
    if (activities?.length > 0) {
      localStorage.setItem("activities", JSON.stringify(activities));
    } else {
      localStorage.removeItem("activities");
    }
    // setFilteredActivities(tempArrary);
  }, [activities]);

  const handleAddActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  //isWorkOrPersonal
  // const handleFilterActivities = () => {
  //   if (selectedCategory === "All") {
  //     return activities;
  //   } else {
  //     return activities.filter(
  //       (activity) => activity.category === selectedCategory
  //     );
  //   }
  // };
  const handleFilterActivities = () => {
    const updatedArray = activities.filter(
      //     (activity) => activity.isForGoodWeather === weather.isGoodWeather
      (activity) => activity.isForGoodWeather === weather.isGoodWeather
      // activity.isWorkOrPersonal === selectedCategory // Assuming you have filterCriteria object with isWorkOrPersonal property
    );

    return updatedArray;
  };

  const handleDeleteActivity = (id) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(updatedActivities);
  };

  return (
    <div style={styledComponent.body}>
      <SelectRegion
        setSelectedLocation={setSelectedLocation}
        styledComponent={styledComponent}
      />
      <div
        style={{
          ...styledComponent.flexBoxStyles,
          height: "22rem",
          flexFlow: "row nowrap",
        }}
      >
        <div
          style={{
            ...styledComponent.flexBoxStyles,
            height: "22rem",
            flexFlow: "column nowrap",
          }}
        >
          <Header
            styledComponent={styledComponent}
            weather={weather}
            selectedLocationString={selectedLocationString}
          />
          <p style={styledComponent.subTitleStyles}>
            {weather.isGoodWeather
              ? uiWeatherConditionText.isGood
              : uiWeatherConditionText.isBad}
          </p>
        </div>
        <div
          style={{ position: "absolute", top: 0, right: 0, maxWidth: "30ch" }}
        >
          <Form
            onAddActivity={handleAddActivity}
            styledComponent={styledComponent}
          />
        </div>
      </div>
      <button onClick={() => setSelectedCategory(!selectedCategory)}>
        {selectedCategory ? "work" : "personal"}
      </button>{" "}
      <List
        activities={filteredActivities}
        isGoodWeather={weather.isGoodWeather}
        onDeleteActivity={handleDeleteActivity}
        styledComponent={styledComponent}
      />
      <div style={{ backgroundColor: "#22222280", marginTop: "5rem" }}>
        <button onClick={() => localStorage.removeItem("activities")}>
          delete LS
        </button>
        <button onClick={() => setActivities(mockData)}>reset mockData</button>
      </div>
    </div>
  );
};

export default App;
