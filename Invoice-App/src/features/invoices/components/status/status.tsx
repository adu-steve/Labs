import clsx from "clsx";
import { type StatusProps } from "./status.types";
import styles from "./status.module.scss";

export const Status = (props: StatusProps) => {
  const { name, className } = props;

  return (
    <div className={clsx(styles.status, styles[name], className)}>
      <span> {name}</span>
    </div>
  );
};
