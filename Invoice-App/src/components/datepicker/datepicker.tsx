import BaseDatePicker from "react-datepicker";
import clsx from "clsx";
import { Icon } from "@/components";
import { type DatePickerProps } from "./datepicker.types";
import styles from "./datepicker.module.scss";

export const DatePicker = (props: DatePickerProps) => {
  const { label, name, errorMessage, className, ...restProps } = props;

  return (
    <div className={clsx(styles.form_field, className)}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.wrapper}>
        <BaseDatePicker
          {...restProps}
          id={name}
          name={name}
          dateFormat="d MMM yyyy"
          popperClassName={styles.popper}
          calendarClassName={styles.calendar}
          className={clsx(styles.input, {
            [styles.error]: !!errorMessage,
          })}
        />
        <Icon name="calendar" className={styles.calendar_icon} />
      </div>
      {errorMessage && (
        <span className={styles.error_message}>{errorMessage}</span>
      )}
    </div>
  );
};
