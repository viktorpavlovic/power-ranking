import { React, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import PowerPage from "./Pages/PowerPage";
import "./app.scss";

const App = () => {
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );
  const [uid, setUid] = useState("");

  return (
    <div className="div-app">
      {accessToken ? (
        <Routes>
          <Route path="/power_page" element={<PowerPage uid={uid} />} />
          <Route path="*" element={<Navigate to="/power_page" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LandingPage setAccessToken={setAccessToken} setUid={setUid} />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
