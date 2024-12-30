import ReactDOM from "react-dom";
import { useEffect } from "react";
import clsx from "clsx";
import { Backdrop } from "@/components";
import { type DrawerProps } from "./drawer.types";
import styles from "./drawer.module.scss";

export const Drawer = (props: DrawerProps) => {
  const { open, children, onOutsideClick } = props;

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return ReactDOM.createPortal(
    <>
      <div className={clsx(styles.drawer, { [styles.drawer__open]: open })}>
        {children}
      </div>
      <Backdrop show={open} onClick={onOutsideClick} />
    </>,
    document.body
  );
};
