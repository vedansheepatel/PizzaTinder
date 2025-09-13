// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import CreateGroup from "./components/CreateGroup";
import JoinGroup from "./components/JoinGroup";
import SwipeDeck from "./components/SwipeDeck";
import WaitingScreen from "./components/WaitingScreen";
import PizzaVisual from "./components/PizzaVisual";
import NotFound from "./components/NotFound";

/**
 * App.tsx - main router and shell for Pizza Tinder (mobile web)
 * - Make sure each imported component exists and has `export default ...`
 * - You can add app-level providers (Auth, Firebase context) here later
 */

const App: React.FC = () => {
  return (
    <Router>
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
          <Route path="/waiting/:roomId" element={<WaitingScreen />} />

          {/* Final pizza result */}
          <Route path="/final/:roomId" element={<PizzaVisual />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
