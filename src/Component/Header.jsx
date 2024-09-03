export default function Header({
  weather,
  styledComponent,
  selectedLocationString,
}) {
  return (
    <>
      <p style={{ ...styledComponent.subTitleStyles }}>
        {selectedLocationString.toUpperCase()}
      </p>
      <div
        style={{
          ...styledComponent.flexBoxStyles,
          height: "fit-content",
          flexFlow: "row nowrap",
        }}
      >
        <p style={styledComponent.subTitleStyles}>{weather.condition}</p>
        <p style={styledComponent.subTitleStyles}>{weather.temperature}°</p>
      </div>
    </>
  );
}
