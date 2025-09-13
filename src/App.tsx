import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/Pages/LandingPage";
import CreateGroup from "./components/Pages/CreateGroup";
import QRDisplay from "./components/Pages/QRdisplay";
import JoinGroup from "./components/Pages/JoinGroup";
import SwipeDeck from "./components/Pages/SwipeDeck";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateGroup />} />
        <Route path="/qr-display" element={<QRDisplay />} />
        <Route path="/join" element={<JoinGroup />} />
        <Route path="/swipe" element={<SwipeDeck />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
