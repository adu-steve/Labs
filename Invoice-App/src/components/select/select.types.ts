import BaseSelect from "react-select";

export type SelectProps<T> = {
  label?: string;
  name?: string;
  errorMessage?: string;
} & Omit<React.ComponentProps<typeof BaseSelect<T>>, "onKeyDown" | "styles">;
