import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { type ErrorViewProps } from "./error-view.types";
import style from "./error-view.module.scss";

export const ErrorView = (props: ErrorViewProps) => {
  const { fullscreen, resetErrorBoundary } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/invoices");
    resetErrorBoundary();
  };

  return (
    <div
      className={clsx(style.error_container, {
        [style.fullscreen]: !!fullscreen,
      })}
    >
      <h1>🔥Error🔥</h1>
      <p>Sorry, something went wrong :(</p>
      <button onClick={handleClick}>Back to the main page</button>
    </div>
  );
};
