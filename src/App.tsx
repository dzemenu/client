import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import WebTracker from "./pages/WebTracker";
import WebAdmin from "./pages/WebAdmin";

function App() {
  return (
    <div>
      <button className="button" onClick={() => window.location.href = "/web-tracker"}>Web Tracker</button>
      <button className="button" onClick={() => window.location.href = "/web-admin"}>Web Admin</button>
      <Routes>
        <Route path="/web-tracker" element={<WebTracker />} />
        <Route path="/web-admin" element={<WebAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
