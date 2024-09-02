import React from "react";

const List = ({ activities, isGoodWeather }) => {
  return (
    <div>
      <h2>
        {isGoodWeather ? "Good Weather Activities" : "Bad Weather Activities"}
      </h2>
      <ul>
        {activities.length ? (
          activities.map((activity) => (
            <li key={activity.id}>{activity.name}</li>
          ))
        ) : (
          <li>No activities available</li>
        )}
      </ul>
    </div>
  );
};

export default List;
