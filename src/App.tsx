import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import WebTracker from "./pages/WebTracker";
import WebAdmin from "./pages/WebAdmin";
import DriverAdmin from "./pages/DriverAdmin";

function App() {
  return (
    <div>
      <div className="headerButton">
      <button
          className="button"
          onClick={() => (window.location.href = "/")}
        >
         Home
        </button>
        <button
          className="button"
          onClick={() => (window.location.href = "/web-tracker")}
        >
          Web Tracker
        </button>
        <button
          className="button"
          onClick={() => (window.location.href = "/web-admin")}
        >
          Web Admin
        </button>
        <button
          className="button"
          onClick={() => (window.location.href = "/driver-admin")}
        >
          Driver Admin
        </button>
      </div>

      <Routes>
        <Route path="/web-tracker" element={<WebTracker />} />
        <Route path="/web-admin" element={<WebAdmin />} />
        <Route path="/driver-admin" element={<DriverAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
