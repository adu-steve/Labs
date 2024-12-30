import { useRef } from "react";
import BaseSelect, { SelectInstance } from "react-select";
import clsx from "clsx";
import { type SelectProps } from "./select.types";
import { getStyles } from "./select.styles";
import css from "./select.module.scss";

export function Select<T>(props: SelectProps<T>) {
  const { label, name, errorMessage, ...restProps } = props;

  const ref = useRef<SelectInstance<T>>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code !== "Enter") return;

    if (!ref.current) return;

    ref.current.onMenuOpen();
  };

  return (
    <div className={clsx(css.form_field)}>
      <label htmlFor={name} className={css.label}>
        {label}
      </label>
      <BaseSelect
        {...restProps}
        inputId={name}
        name={name}
        styles={getStyles(!!errorMessage)}
        onKeyDown={handleKeyDown}
        ref={ref}
      />
      {errorMessage && (
        <span className={css.error_message}>{errorMessage}</span>
      )}
    </div>
  );
}
