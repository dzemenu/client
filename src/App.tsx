import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import WebTracker from "./pages/WebTracker";

function App() {
  return (
    <div>
      <h1>GOZEM</h1>
      <Routes>
        <Route path="/web-tracker" element={<WebTracker />} />
      </Routes>
    </div>
  );
}

export default App;
