import clsx from "clsx";
import { type CheckboxProps } from "./checkbox.types";
import styles from "./checkbox.module.scss";

export const Checkbox = (props: CheckboxProps) => {
  const { label, checked = false, className, onChange } = props;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.code !== "Space") return;

    onChange(!checked);
  };

  return (
    <label
      tabIndex={0}
      className={clsx(styles.checkbox_wrapper, className)}
      role="checkbox"
      aria-checked={checked}
      onKeyDown={handleKeyDown}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.custom_checkbox}></span>
      <span>{label}</span>
    </label>
  );
};
