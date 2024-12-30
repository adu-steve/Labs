import { Link } from "react-router-dom";

export type LinkProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
} & React.ComponentProps<typeof Link>;
