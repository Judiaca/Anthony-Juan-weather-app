import React from "react";

export default function SelectRegion({ setSelectedLocation, styledComponent }) {
  return (
    <div
      style={{
        ...styledComponent.flexBoxStyles,
        maxWidth: "40rem",
        height: "fit-content",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <button
        onClick={() =>
          setSelectedLocation(
            "https://example-apis.vercel.app/api/weather/arctic"
          )
        }
      >
        Arctic
      </button>
      <button
        onClick={() =>
          setSelectedLocation(
            "https://example-apis.vercel.app/api/weather/sahara"
          )
        }
      >
        Sahara
      </button>
      <button
        onClick={() =>
          setSelectedLocation(
            "https://example-apis.vercel.app/api/weather/rainforest"
          )
        }
      >
        Rainforest
      </button>
      <button
        onClick={() =>
          setSelectedLocation(
            "https://example-apis.vercel.app/api/weather/europe"
          )
        }
      >
        Europe
      </button>
    </div>
  );
}
