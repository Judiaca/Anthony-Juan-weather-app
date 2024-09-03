{
  /**
// NOTE: We disabled the prop-types error in 

eslint.config.js :
rules: {
 "react/prop-types": "off", //Or: "error" || "warn"
},

*/
}
import React, { useState, useEffect } from 'react';
import { uid } from 'uid';
import { mockData, uiWeatherConditionText } from './assets/mockData';
import { fetchData } from './helpers/helpers.js';

import Form from './Component/Form';
import List from './Component/List';

import './App.css';

const App = () => {
  const [activities, setActivities] = useState(
    JSON.parse(localStorage.getItem('activities')) || mockData
  );

  console.log('activities', activities);
  const [filteredActivities, setFilteredActivities] = useState(activities);
  console.log('filteredActivities', filteredActivities);
  const [weather, setWeather] = useState({});
  const url = 'https://example-apis.vercel.app/api/weather/europe';

  useEffect(() => {
    // read data from API when component mounted
    fetchData(url, setWeather);

    const intervalId = setInterval(() => {
      fetchData(url, setWeather);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    const tempArrary = handleFilterActivities();
    setFilteredActivities(tempArrary);
    return () => {};
  }, [weather]);

  useEffect(() => {
    if (activities?.length > 0) {
      localStorage.setItem('activities', JSON.stringify(activities));
    } else {
      localStorage.removeItem('activities');
    }
    // const tempArrary = handleFilterActivities();
    // setFilteredActivities(tempArrary);
  }, [activities]);

  const handleAddActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const handleFilterActivities = () => {
    const updatedArray = activities.filter(
      (activity) => activity.isForGoodWeather === weather.isGoodWeather
    );

    return updatedArray;
  };

  const handleDeleteActivity = (id) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(updatedActivities);

    // Update filteredActivities after deleting from activities
  };

  //TODO: Toggle UI to Good/Bad Weather activity
  return (
    <div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
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
        activities={filteredActivities}
        isGoodWeather={weather.isGoodWeather}
        onDeleteActivity={handleDeleteActivity}
      />

      <div style={{ backgroundColor: '#22222280', marginTop: '5rem' }}>
        <button onClick={() => localStorage.removeItem('activities')}>
          delete LS
        </button>
        <button onClick={() => setActivities(mockData)}>reset mockData</button>
      </div>
    </div>
  );
};

export default App;
