import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StarterPage from "./pages/StarterPage";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import PlanSelectionPage from "./pages/PlanSelectionPage";
import AddOnsPage from "./pages/AddOnsPage";
import SummaryPage from "./pages/SummaryPage";
import SuccessPage from "./pages/SuccessPage";

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<StarterPage />} />
      <Route path="/personal-info" element={<PersonalInfoPage />} />
      <Route path="/plan-selection" element={<PlanSelectionPage />} />
      <Route path="/add-ons" element={<AddOnsPage />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
