import { Link as BaseLink } from "react-router-dom";
import clsx from "clsx";
import { type LinkProps } from "./link.types";
import styles from "./link.module.scss";

export const Link = (props: LinkProps) => {
  const { icon, className, children, ...restProps } = props;

  return (
    <BaseLink
      className={clsx(styles.link, { [styles.icon]: !!icon }, className)}
      {...restProps}
    >
      {!!icon && icon}
      {children}
    </BaseLink>
  );
};
