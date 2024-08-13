import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import WebTracker from "./pages/WebTracker";
import WebAdmin from "./pages/WebAdmin";

function App() {
  return (
    <div>
      <h1>GOZEM</h1>
      <Routes>
        <Route path="/web-tracker" element={<WebTracker />} />
        <Route path="/web-admin" element={<WebAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
