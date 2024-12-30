import { CSSObjectWithLabel } from "react-select";

export const getStyles = (hasErrors: boolean) => ({
  control: (
    baseStyle: CSSObjectWithLabel,
    { isFocused }: { isFocused: boolean }
  ) => ({
    ...baseStyle,
    borderRadius: "var(--input-border-radius)",
    borderColor: hasErrors
      ? "hsl(var(--clr-accent-red-300))"
      : "var(--input-border-color)",
    backgroundColor: "var(--input-bg-color)",
    height: "var(--input-height)",
    boxShadow:
      isFocused && hasErrors
        ? "0 0 0 1px hsl(var(--clr-accent-red-400))"
        : isFocused
        ? "0 0 0 1px hsl(var(--clr-primary-300))"
        : "none",
    transition:
      "background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
    ":hover": {
      borderColor: hasErrors
        ? "hsl(var(--clr-accent-red-400))"
        : "hsl(var(--clr-primary-300))",
    },
  }),
  placeholder: (baseStyle: CSSObjectWithLabel) => ({
    ...baseStyle,
    color: "var(--input-text-color)",
    transition: "color 0.4s ease",
  }),
  singleValue: (baseStyle: CSSObjectWithLabel) => ({
    ...baseStyle,
    color: "var(--input-text-color)",
    transition: "color 0.4s ease",
  }),
  menu: (baseStyle: CSSObjectWithLabel) => ({
    ...baseStyle,
    backgroundColor: "var(--input-bg-color)",
    borderRadius: "8px",
    transition: "background-color 0.4s ease",
  }),
  option: (
    baseStyle: CSSObjectWithLabel,
    { isSelected, isFocused }: { isSelected: boolean; isFocused: boolean }
  ) => {
    return {
      ...baseStyle,
      color: isSelected
        ? "hsl(var(--clr-primary-400))"
        : "var(--input-text-color)",
      height: "40px",
      cursor: `pointer`,
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid var(--select-separator-color)",
      backgroundColor: isFocused
        ? "var(--select-option-hover-color)"
        : "transparent",
      ":last-child": {
        borderBottom: "none",
      },
      transition:
        "background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease",
    };
  },
});
