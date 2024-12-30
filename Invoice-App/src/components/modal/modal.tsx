import { useEffect } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { Backdrop } from "@/components";
import { type ModalProps } from "./modal.types";
import styles from "./modal.module.scss";

export const Modal = (props: ModalProps) => {
  const { open, children, onClickOutside } = props;

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return ReactDOM.createPortal(
    <>
      <div className={clsx(styles.modal, { [styles.modal_show]: open })}>
        {children}
      </div>
      <Backdrop show={open} onClick={onClickOutside} />
    </>,
    document.body
  );
};
