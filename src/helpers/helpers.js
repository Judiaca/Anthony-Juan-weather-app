export const fetchData = async (url, setWeather) => {
  try {
    const response = await fetch(url);

    const data = await response.json();
    setWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// export const filterActivitiesByIsGoodWeather = (activities) => {
//   console.log(activities);
// };

// export const handleNewAppState = (appState) => {
//   console.log(appState);
// };
// export const handleDeleteActivity = (activities, setActivities, id) => {
//   const updatedArray = activities.filter((activity) => activity.id !== id);
//   setActivities(updatedArray);
// };
