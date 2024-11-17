// import React from "react";
// import "../css/WaterLevelGauge.css";

// const WaterLevelGauge = ({ value }) => {
//   return (
//     <div className="waterGauge-container">
//       <svg className="waterGauge" viewBox="0 0 36 36">
//         {/* Background circle */}
//         <path
//           className="waterGauge-bg"
//           d="M18 2.0845
//             a 15.9155 15.9155 0 0 1 0 31.831
//             a 15.9155 15.9155 0 0 1 0 -31.831"
//         />

//         {/* Filled portion */}
//         <path
//           className="waterGauge-fill"
//           style={{ strokeDasharray: `${value}, 100` }}
//           d="M18 2.0845
//             a 15.9155 15.9155 0 0 1 0 31.831
//             a 15.9155 15.9155 0 0 1 0 -31.831"
//         />

//         {/* Counter-rotated text */}
//         <text
//           x="18"
//           y="20.35"
//           className="waterGauge-percentage"
//           transform="rotate(90 18 18)"
//         >
//           {value}%
//         </text>
//       </svg>

//       <p className="waterGauge-label">Water Level</p>
//     </div>
//   );
// };

// export default WaterLevelGauge;


import React, { useState, useEffect } from "react";
import "../css/WaterLevelGauge.css"
const WaterLevelGauge = () => {
  const [waterLevel, setWaterLevel] = useState(0);
  const [waterFlowActive, setWaterFlowActive] = useState(true);
  const [notification, setNotification] = useState({
    message: "",
    color: "green",
  });

  useEffect(() => {
    if (waterFlowActive) {
      const interval = setInterval(simulateWaterLevelChange, 5000);
      return () => clearInterval(interval);
    }
  }, [waterFlowActive]);

  const simulateWaterLevelChange = () => {
    const newValue = Math.floor(Math.random() * 60) + 40;

    if (waterFlowActive) {
      updateGauge(newValue);

      if (newValue <= 60) {
        showNotification(`Water level is at ${newValue}%.`, "green");
      } else if (newValue > 60 && newValue < 90) {
        showNotification(
          `Alert: Water level has exceeded 60%. Current level: ${newValue}%.`,
          "orange"
        );
      }

      if (newValue >= 90) {
        showNotification(
          `Critical: Water level reached ${newValue}%. Automatically stopping water flow.`,
          "red"
        );
        stopWaterFlow();
      }
    }
  };

  const updateGauge = (value) => {
    setWaterLevel(value);
  };

  const showNotification = (message, color) => {
    setNotification({ message, color });
  };

  const stopWaterFlow = () => {
    setWaterFlowActive(false);
  };

  const startWaterFlow = () => {
    setWaterFlowActive(true);
  };

  const toggleWaterFlow = () => {
    if (waterFlowActive) {
      stopWaterFlow();
      showNotification("Water flow has been manually turned off.", "orange");
    } else {
      startWaterFlow();
      showNotification("Water flow has been manually turned on.", "green");
    }
  };

  return (
    <div className="waterGauge-container">
      <div className="gauge">
        <svg className="waterGauge" viewBox="0 0 36 36">
          <path className="waterGauge-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"/>
          <path
  className={`waterGauge-fill ${waterLevel >= 90 ? "critical" : ""}`}
  strokeDasharray={`${waterLevel}, 100`}
  d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
/>

          <text  x="18"
          y="20.35"
          className="waterGauge-percentage"
          transform="rotate(90 18 18)">
            {`${waterLevel}%`}
          </text>
        </svg>
      </div>

      <div
        id="notification-bar"
        className={`notification-bar ${notification.color}`}
      >
        {notification.message}
      </div>
      <p className="waterGauge-label">Water Level Percentage</p>

      <button
        id="toggleButton"
        onClick={toggleWaterFlow}
        className={`toggle-button ${
          waterFlowActive ? "active" : "inactive"
        }`}
      >
        {waterFlowActive ? "Turn Off Water Flow" : "Turn On Water Flow"}
      </button>

    </div>
  );
};

export default WaterLevelGauge;
