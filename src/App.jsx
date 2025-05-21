import React from "react";

import "./App.css";
import WeatherWidget from "./components/WeatherWidget";

function App() {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <WeatherWidget />;
      </div>
    </>
  );
}

export default App;
