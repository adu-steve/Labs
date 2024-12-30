import { ComponentProps } from "react";
import BaseDatePicker from "react-datepicker";

export type DatePickerProps = {
  label: string;
  errorMessage?: string;
} & Omit<
  ComponentProps<typeof BaseDatePicker>,
  "popperClassName" | "calendarClassName" | "dateFormat"
>;
