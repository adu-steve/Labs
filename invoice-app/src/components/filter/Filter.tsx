import "./filter.styles.css";
import Button from "../ui/button/button.tsx";
import arrowDownIcon from "../../assets/images/icon-arrow-down.svg";
import Icon from "../ui/icon/Icon.tsx";
import { useAppSelector } from "../../hooks/useRedux.ts";
import { mobileSelector } from "../../features/mobile/mobile.slice.tsx";
import { useEffect, useState } from "react";
import FilterDropdown from "./filter-dropdown.tsx";

const Filter = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { isMobile } = useAppSelector(mobileSelector);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const disablePopup = (e: MouseEvent) => {
      if (e.target && !(e.target as Element).closest(".filter")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", disablePopup);
    return () => {
      document.removeEventListener("click", disablePopup);
    };
  }, []);
  return (
    <div className={"filter"}>
      <Button onClick={toggleDropdown}>
        {isMobile ? "Filter" : "Filter by status"}
        <Icon
          className={showDropdown ? "rotate180" : ""}
          size={"sm"}
          icon={arrowDownIcon}
          description={"dropdown arrow"}
        />
      </Button>

      {showDropdown && (
        <>
          <FilterDropdown options={["paid", "pending", "draft"]} />
        </>
      )}
    </div>
  );
};

export default Filter;
