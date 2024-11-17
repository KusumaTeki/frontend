import React, { useState, useEffect } from "react";
import "./css/style.css";
import Canvas from "./components/canvas";
import { database } from "./components/firebase";
import { ref, onValue } from "firebase/database";
import SendMailButton from "./components/SendMail";
import WaterLevelGauge from "./components/WaterLevelGauge";

const App = () => {
  const [distance, setDistance] = useState(0);
  const [volume, setVolume] = useState(0);
  const [quality, setQuality] = useState(0);

  useEffect(() => {
    const distanceRef = ref(database, "main/sensor1/value");
    const volumeRef = ref(database, "main/sensor2/value");
    const qualityRef = ref(database, "main/sensor3/value");

    const unsubscribeDistance = onValue(distanceRef, (snapshot) => {
      const value = snapshot.val();
      setDistance(value ? value.toFixed(2) : "0.00");
    });

    const unsubscribeVolume = onValue(volumeRef, (snapshot) => {
      const value = snapshot.val();
      setVolume(value ? value.toFixed(2) : "0.00");
    });

    const unsubscribeQuality = onValue(qualityRef, (snapshot) => {
      const value = snapshot.val();
      setQuality(value ? value.toFixed(2) : "0.00");
    });

    return () => {
      unsubscribeDistance();
      unsubscribeVolume();
      unsubscribeQuality();
    };
  }, []);

  return (
    <>
      <div className="appContainer">
        <h1>Water Level Monitoring System</h1>
        <div className="container">
          <div className="levelBox">
            <Canvas title="Water Depth" value={distance} unit="cm" />
          </div>
          <div className="levelBox">
            <Canvas title="Water flowrate" value={volume} unit="LitperHour" />
          </div>
          <div className="levelBox">
            <Canvas title="Water Quality" value={quality} unit="TDS" />
          </div>
        </div>
      </div>
      <WaterLevelGauge  />
      <SendMailButton/>
    </>
  );
};

export default App;





    // <div className="appContainer">
    //   <h1>Dashboard</h1>
    //   <div className="container">
    //     <div className="levelBox">
    //       <h3>Tank 1</h3>
    //       <WaterLevelGauge value={60} />
    //     </div>
    //     <div className="levelBox">
    //       <h3>Tank 2</h3>
    //       <WaterLevelGauge value={80} />
    //     </div>
    //     <div className="levelBox">
    //       <h3>Tank 3</h3>
    //       <WaterLevelGauge value={40} />
    //     </div>
    //   </div>
    // </div>
  