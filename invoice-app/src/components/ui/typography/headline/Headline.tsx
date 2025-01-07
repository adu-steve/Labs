import { ReactNode, HTMLAttributes } from "react";
import styles from "./headline.module.css";

interface HeadlineProps extends HTMLAttributes<HTMLHeadElement> {
  children?: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  display?: "block" | "inline" | "flex";
}

const Headline = (props: HeadlineProps) => {
  const combinedClassName =
    `${styles.headline} ${styles[props.variant ?? ""]} ${props.className ?? ""}`.trim();
  const Tag = props.variant as keyof JSX.IntrinsicElements;
  return <Tag className={combinedClassName}>{props.children}</Tag>;
};

export default Headline;
