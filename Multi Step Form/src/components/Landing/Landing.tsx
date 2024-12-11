import "./landing.css";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const navigate = useNavigate();

  const goToForm = () => {
    localStorage.removeItem("complete");
    navigate("/auth-form");
  };

  return (
    <div className={"landing"}>
      <div className={"svg__image__mobile"}></div>
      <div className={"landing__content"}>
        <div className={"svg__image"}></div>
        <div className={"frontend__content"}>
          <h1>Welcome User 😁</h1>
          <p>Please proceed to click on the button to fill in the details.</p>
          <button className={"landing__button"} onClick={goToForm}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
