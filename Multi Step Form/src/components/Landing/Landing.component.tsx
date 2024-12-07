import "./landing.styles.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className={"landing"}>
      <button className={"landing__button"}>
        <Link to="/auth-form">Get started</Link>
      </button>
    </div>
  );
}

export default LandingPage;
