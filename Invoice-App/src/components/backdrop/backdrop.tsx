import clsx from "clsx";
import { type BackdropProps } from "./backdrop.types";
import styles from "./backdrop.module.scss";

export const Backdrop = (props: BackdropProps) => {
  const { show, onClick } = props;

  return (
    <div
      className={clsx(styles.backdrop, { [styles.backdrop__visible]: show })}
      onClick={onClick}
    ></div>
  );
};
