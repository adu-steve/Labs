import { ReactComponent as ArrowDownIcon } from "@/assets/icons/icon-arrow-down.svg";
import { ReactComponent as ArrowLeftIcon } from "@/assets/icons/icon-arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "@/assets/icons/icon-arrow-right.svg";
import { ReactComponent as CalendarIcon } from "@/assets/icons/icon-calendar.svg";
import { ReactComponent as CheckIcon } from "@/assets/icons/icon-check.svg";
import { ReactComponent as DeleteIcon } from "@/assets/icons/icon-delete.svg";
import { ReactComponent as MoonIcon } from "@/assets/icons/icon-moon.svg";
import { ReactComponent as SunIcon } from "@/assets/icons/icon-sun.svg";
import { ReactComponent as PlusIcon } from "@/assets/icons/icon-plus.svg";
import { type IconProps } from "./icon.types";

export const Icon = (props: IconProps) => {
  const { name, ...restProps } = props;

  switch (name) {
    case "arrow-down":
      return <ArrowDownIcon {...restProps} />;

    case "arrow-left":
      return <ArrowLeftIcon {...restProps} />;

    case "arrow-right":
      return <ArrowRightIcon {...restProps} />;

    case "calendar":
      return <CalendarIcon {...restProps} />;

    case "check":
      return <CheckIcon {...restProps} />;

    case "delete":
      return <DeleteIcon {...restProps} />;

    case "moon":
      return <MoonIcon {...restProps} />;

    case "sun":
      return <SunIcon {...restProps} />;

    case "plus":
      return <PlusIcon {...restProps} />;

    default:
      return null;
  }
};
