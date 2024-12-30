export type IconProps = {
  name?:
    | "arrow-down"
    | "arrow-left"
    | "arrow-right"
    | "calendar"
    | "check"
    | "delete"
    | "moon"
    | "sun"
    | "plus";
} & React.ComponentPropsWithoutRef<"svg">;
