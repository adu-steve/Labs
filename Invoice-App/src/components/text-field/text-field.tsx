import React from "react";
import clsx from "clsx";
import { type TextFieldProps } from "./text-field.types";
import styles from "./text-field.module.scss";

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const { label, className, errorMessage, ...restProps } = props;

    return (
      <div className={styles.form_field}>
        <label htmlFor={props.name} className={styles.label}>
          {label}
        </label>
        <input
          {...restProps}
          id={props.name}
          className={clsx(
            styles.input,
            {
              [styles.error]: !!errorMessage,
            },
            className
          )}
          ref={ref}
        />
        {errorMessage && (
          <span className={styles.error_message}>{errorMessage}</span>
        )}
      </div>
    );
  }
);
