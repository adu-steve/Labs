import styles from "./dropdown.module.css";
import { ReactNode } from "react";

interface DropdownProps {
  children: ReactNode;
  className?: string;
}

const Dropdown = ({ children, className }: DropdownProps) => {
  return (
    <div
      className={`${styles.dropdown} ${className ?? ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default Dropdown;
