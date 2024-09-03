const List = ({ activities, onDeleteActivity, styledComponent }) => {
  return (
    <div
      style={{
        ...styledComponent.flexBoxStyles,
        overflow: "hidden",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ul
        style={{
          width: "100%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "row wrap",
          overflow: "scroll",
          gap: "1rem",
        }}
      >
        {activities?.length ? (
          activities?.map((activity) => (
            <div
              key={activity?.id}
              style={{
                ...styledComponent.flexBoxStyles,

                height: "fit-content",
                maxWidth: "10rem",
              }}
            >
              <button
                onClick={() => onDeleteActivity(activity?.id)}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                X
              </button>
              <li
                className={activity?.category?.toLowerCase() + "-category"}
                style={
                  activity?.isForGoodWeather
                    ? styledComponent.isGoodWeatherStyles
                    : styledComponent.isNotGoodWeatherStyles
                }
              >
                {activity?.name}
              </li>
            </div>
          ))
        ) : (
          <li>No activities available</li>
        )}
      </ul>
    </div>
  );
};

export default List;
