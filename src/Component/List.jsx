import React from 'react';

const List = ({ activities, isGoodWeather, onDeleteActivity }) => {
  return (
    <div>
      <h2>
        {isGoodWeather ? 'Good Weather Activities' : 'Bad Weather Activities'}
      </h2>
      <ul>
        {activities.length ? (
          activities.map((activity) => (
            <li key={activity.id}>
              {activity.name}
              <button onClick={() => onDeleteActivity(activity.id)}>
                Delete
              </button>
              {activity.isForGoodWeather
                ? 'is good Weather activity'
                : 'is bad Weather activity'}
            </li>
          ))
        ) : (
          <li>No activities available</li>
        )}
      </ul>
    </div>
  );
};

export default List;
