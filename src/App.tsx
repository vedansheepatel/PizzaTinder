// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import CreateGroup from "./components/CreateGroup";
import JoinGroup from "./components/JoinGroup";
import SwipeDeck from "./components/SwipeDeck";
import WaitingRoom from "./components/WaitingRoom";
import FinalPizza from "./components/FinalPizza";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* You can add a top nav / header here if desired */}
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Group creation / join */}
          <Route path="/create" element={<CreateGroup />} />
          <Route path="/join/:roomId" element={<JoinGroup />} />
          <Route path="/join" element={<Navigate to="/" replace={true} />} />

          {/* Swiping flow */}
          {/* /swipe/:roomId - page where members swipe toppings */}
          <Route path="/swipe/:roomId" element={<SwipeDeck />} />

          {/* Waiting screen while aggregation runs */}
          <Route path="/waiting/:roomId" element={<WaitingRoom />} />

          {/* Final pizza result */}
          <Route path="/final/:roomId" element={<FinalPizza />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
