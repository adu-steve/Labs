import clsx from "clsx";
import { LoadingSpinner } from "@/components";
import { type ButtonProps } from "./button.types";
import styles from "./button.module.scss";

export const Button = (props: ButtonProps) => {
  const {
    variant = "primary",
    loading,
    icon,
    className,
    children,
    ...restProps
  } = props;

  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        { [styles.icon]: !!icon },
        { [styles.loading]: loading },
        className
      )}
      {...restProps}
    >
      {loading && <LoadingSpinner />}
      {!!icon && icon}
      {children}
    </button>
  );
};
