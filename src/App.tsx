import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/Pages/LandingPage";
import CreateGroup from "./components/Pages/CreateGroup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateGroup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
