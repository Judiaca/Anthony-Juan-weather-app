import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the main App component
import "./index.css"; // Import global CSS styles

// Find the root element in the HTML where the React app will be mounted
const rootElement = document.getElementById("root");

// Create a root ReactDOM object
const root = ReactDOM.createRoot(rootElement);

// Render the App component into the root DOM node
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
