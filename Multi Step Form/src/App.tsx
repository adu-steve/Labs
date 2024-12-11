import "./App.css";
import { Route, Routes } from "react-router-dom";
import FrontPage from "./components/Landing/Landing.tsx";
import AuthForm from "./components/AuthForm/AuthForm.component.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/auth-form" element={<AuthForm />} />
      </Routes>
    </>
  );
}

export default App;
