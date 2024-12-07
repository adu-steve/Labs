import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing/Landing.component.tsx";
import AuthForm from "./components/AuthForm/AuthForm.component.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth-form" element={<AuthForm />} />
      </Routes>
    </>
  );
}

export default App;
