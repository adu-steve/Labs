import clsx from "clsx";
import { type LoadingSpinnerProps } from "./loading-spinner.types";
import styles from "./loading-spinner.module.scss";

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { className, size = "medium" } = props;

  return (
    <div
      className={clsx(
        className,
        styles.loading_spinner,
        styles[`loading_spinner--${size}`]
      )}
    ></div>
  );
};
