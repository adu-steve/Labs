export type ButtonProps = {
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  loading?: boolean;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;
